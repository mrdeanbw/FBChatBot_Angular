function pad(num) {
    let intValue = Math.abs(Math.floor(num));
    return (intValue < 10 ? '0' : '') + intValue;
}

let timezoneOffsetFilter = () => (date) => {
    let timezoneOffset = -date.getTimezoneOffset();
    let sign = timezoneOffset >= 0 ? '+' : '-';
    return sign + pad(timezoneOffset / 60) + ':' + pad(timezoneOffset % 60);
};

export default timezoneOffsetFilter;
