/**
 * 工具类
 */

const timeSeg = "-"

function Timetransfer(time) {
    if (!time) return '';
    let date = new Date(time);

    let year = date.getFullYear()
    let Mouth = (date.getMonth()+1).toString().padStart(2,"0")
    let day = date.getDate().toString().padStart(2,"0")

    return year + timeSeg + Mouth + timeSeg + day;
}

export {
    Timetransfer
}