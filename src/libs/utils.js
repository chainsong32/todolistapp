function _addZero(value) {
    return value < 10 ? "0" + value : value;
}

function formatDateTime(timeStamp) {
    const date = new Date(timeStamp);

    const y = date.getFullYear(),
        m = _addZero(date.getMonth() + 1),
        d = _addZero(date.getDate()),
        h = _addZero(date.getHours()),
        i = _addZero(date.getMinutes()),
        s = _addZero(date.getSeconds());

    return `${y}年${m}月${d}日 ${h}:${i}:${s}`;
}

export {
    formatDateTime
}