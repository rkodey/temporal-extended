import  { Formatter }   from  './formatter.js';


// @TODO add missing formats for dayjs -> moment.js formatting


// dayjs / moment formatting
// https://day.js.org/docs/en/display/format
// https://github.com/iamkun/dayjs
// https://momentjs.com/docs/#/displaying/
// https://github.com/moment/moment

// Mo   1st 2nd ... 11th 12th
// Q    1 2 3 4
// Qo   1st 2nd 3rd 4th
// Do   1st 2nd ... 30th 31st
// DDD  1 2 ... 364 365
// DDDo   1st 2nd ... 364th 365th
// DDDD   001 002 ... 364 365
// do   0th 1st ... 5th 6th
// e  0 1 ... 5 6   Day of Week (Locale)
// E  1 2 ... 6 7   Day of Week (ISO)
// w  1 2 ... 52 53
// W  1 2 ... 52 53
// wo   1st 2nd ... 52nd 53rd
// Wo   1st 2nd ... 52nd 53rd
// ww   01 02 ... 52 53
// WW   01 02 ... 52 53
// Y  1970 1971 ... 9999 +10000 +10001 Note: This complies with the ISO 8601 standard for dates past the year 9999
// k  1 2 ... 23 24
// kk   01 02 ... 23 24
// S  0 1 ... 8 9
// SS   00 01 ... 98 99
// SSSS ... SSSSSSSSS   000[0..] 001[0..] ... 998[0..] 999[0..]
// z or zz  EST CST ... MST PST
// X  1360013296      Unix Timestamp
// x  1360013296123   Unix Millisecond Timestamp
const DAYJS       : {
  FORMAT_DEFAULT  : string
  REGEX_FORMAT    : RegExp
  FN_MAP          : Record<string, ReplaceFunction>
} = {
  FORMAT_DEFAULT  : 'YYYY-MM-DDTHH:mm:ssZ',
  REGEX_FORMAT    : /\[([^\]]+)]|YYYY|YY|Mo|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
  FN_MAP          : {
  // Using a Map was slightly faster than Record, but the Record is more concise
  // REPLACE_FN_MAP  : new Map(Object.entries({
    YY            : Formatter.Year02,
    YYYY          : Formatter.Year04,
    M             : Formatter.Month1,
    MM            : Formatter.Month02,
    MMM           : Formatter.MonthShort,
    MMMM          : Formatter.MonthLong,
    D             : Formatter.Day1,
    DD            : Formatter.Day02,
    d             : Formatter.DayOfWeek0,
    dd            : Formatter.WeekDaySh,
    ddd           : Formatter.WeekDayShort,
    dddd          : Formatter.WeekDayLong,
    H             : Formatter.Hour241,
    HH            : Formatter.Hour2402,
    h             : Formatter.Hour121,
    hh            : Formatter.Hour1202,
    a             : Formatter.ampm,
    A             : Formatter.AMPM,
    m             : Formatter.Minute1,
    mm            : Formatter.Minute02,
    s             : Formatter.Second1,
    ss            : Formatter.Second02,
    SSS           : Formatter.Milli03,
    Z             : Formatter.TZ05,
    ZZ            : Formatter.TZ04,
  },
};


export function format(date: DateTime, formatStr ?: string) {
  const str = formatStr || DAYJS.FORMAT_DEFAULT;    // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
  return str.replace(DAYJS.REGEX_FORMAT, (match: string, escaped_string: string) => {
    const fn      = DAYJS.FN_MAP[match] ?? (() => match);
    return escaped_string || fn(date);
  }).trim();
}
