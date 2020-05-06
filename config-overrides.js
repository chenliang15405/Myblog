// react-app-rewired 对 webpack做的扩展，无需eject

const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

/* config-overrides.js */
// module.exports = function override(config, env) {
//     //do stuff with the webpack config...
//     return config;
// }

const {
    override,
    addWebpackPlugin,
    addWebpackAlias,
    fixBabelImports
} = require("customize-cra")

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rewiredMap = () => config => {
    config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
    return config
}


const dropConsole = () => {
    return (config) => {
        if(config.optimization.minimizer){
            config.optimization.minimizer.forEach((minimizer) => {
                if(minimizer.constructor.name === 'TerserPlugin'){
                    minimizer.options.terserOptions.compress.drop_console = true
                }
            })
        }
        return config;
    }
}

const myPlugin = [
    // 压缩js体积
    new UglifyJsPlugin({
        parallel: 4,
        uglifyOptions: {
            output: {
                comments: false,
                beautify: false,
            },
            compress: {
            },
            warnings: false
        },
        cache: true,
    }),
    new CompressionPlugin({
        filename: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
        algorithm: 'gzip',//算法
        test: new RegExp(
            '\\.(js|css)$'    //压缩 js 与 css
        ),
        threshold: 10240,//只处理比这个值大的资源。按字节计算
        minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
    }),
    new HtmlWebpackPlugin({
        title: '',
        template: path.resolve(path.resolve(__dirname), 'public/index.html'),
        filename: 'index.html',
        minify: {
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true, // 删除空白符与换行符
            useShortDoctype: true,
            removeEmptyAttributes: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
        inject: 'body'
    }),
    // 该插件的主要是为了抽离 css 样式,防止将样式打包在 js 中文件过大和因为文件大网络请求超时的情况
    //new ExtractTextPlugin('static/css/styles.[md5:contenthash:hex:8].css')  // 因为使用路由按需加载，所以需要配置这个contenthash
    // webpack 4.0之后使用MiniCssExtractPlugin, 之前使用ExtractTextPlugin
    new MiniCssExtractPlugin({
        filename:"static/css/[name].css", //输出的css文件名，默认以入口文件名命名(例如main.css)
        chunkFilename: "static/css/[id].css"
    })
]


module.exports = override(
    // 关闭mapSource
    rewiredMap(),
    //路径别名
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
    }),
    // 生产环境去除console.*
    dropConsole(),

    fixBabelImports('import', { //配置按需加载
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),


    // 配置 webpack plugin
    (config) => {
        if(process.env.NODE_ENV !== 'development') {
            config.plugins = [...config.plugins, ...myPlugin]
        }
        //1.修改、添加loader 配置 :
        // 所有的loaders规则是在config.module.rules(数组)的第二项
        // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
        // 修改 sass 配置 ，规则 loader 在第五项(具体看配置)
        // const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
        // loaders[5].use.push({
        //     loader: 'sass-resources-loader',
        //     options: {
        //         resources: path.resolve(__dirname, 'src/asserts/css/base.scss')//全局引入公共的scss 文件
        //     }
        // })

        return config
    }

)