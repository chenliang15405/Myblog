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

function TimetransferDetail(time) {
    if(!time)return '';
    let date = new Date(time)

    let year = date.getFullYear()
    let mouth = (date.getMonth()+1).toString().padStart(2,"0")
    let day = date.getDate().toString().padStart(2,"0")
    let hours = date.getHours().toString().padStart(2,"0")
    let minutes = date.getMinutes().toString().padStart(2,"0")
    let seconds = date.getSeconds().toString().padStart(2,"0")

    return `${year}-${mouth}-${day} ${hours}:${minutes}:${seconds}`
}

export {
    Timetransfer,
    TimetransferDetail
}