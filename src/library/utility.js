exports.uuid = function (len) {
    function base36(val) {
        return Math.round(val).toString(36);
    }

    // uid should starts with alpha
    var result = base36(10 + 25 * Math.random());

    if (!len)
        len = 16;

    while (result.length < len)
        result += base36(new Date * Math.random());

    return result.substr(0, len);
}