let timezonedFilter = (dateTime, outTimezone, format, inTimezone) => {
    if (!dateTime.length) {
        dateTime = undefined;
    }

    format      = format || 'MMMM Do, h:mm a'; // defaultFormat
    outTimezone = outTimezone || 0; // defaults to UTC

    var momentObject;

    if (!inTimezone && !dateTime) {
        momentObject = moment();
    } else {
        inTimezone = inTimezone || 0; // defaults to UTC
        if (angular.isNumber(inTimezone)) {
            var minutes        = inTimezone * 60;
            var hours          = Math.floor(minutes / 60);
            minutes %= 60;
            var timezoneString = "+" + ('0' + hours).substr(-2) + ":" + ('0' + minutes).substr(-2);
            momentObject       = moment(dateTime + timezoneString);
        } else {
            momentObject = moment.tz(dateTime, inTimezone);
        }
    }

    if (angular.isNumber(outTimezone)) {
        momentObject = momentObject.utcOffset(outTimezone * 60);
    } else {
        momentObject = momentObject.tz(outTimezone);
    }

    return momentObject.format(format);
};


export default timezonedFilter;