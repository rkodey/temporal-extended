/* eslint-disable no-use-before-define */
import  {
  type DateTimeLike,
  type ReplaceFunction,
  Formatter,
} from  './formatter.js';


const STRFTIME    : {
  FORMAT_DEFAULT  : string
  REGEX_FORMAT    : RegExp
  REPLACE_Formatter  : Record<string, ReplaceFunction>
} = {
  FORMAT_DEFAULT  : '%c',
  REGEX_FORMAT    : /%[a-z%]/ig,
  REPLACE_Formatter  : {
    a             : Formatter.WeekDayShort,
    A             : Formatter.WeekDayLong,
    u             : Formatter.DayOfWeek1,    // The day of the week as a decimal, range 1 to 7, Monday being 1
    w             : Formatter.DayOfWeek0,    // The day of the week as a decimal, range 0 to 6, Sunday being 0
    q             : Formatter.Quarter1,
    d             : Formatter.Day02,
    e             : Formatter.Day_2,
    j             : Formatter.DayOfYear03,
    h             : Formatter.MonthShort,
    b             : Formatter.MonthShort,
    B             : Formatter.MonthLong,
    m             : Formatter.Month02,
    // U             : week number of the year, Sunday as the first day of the week, padded to 2 digits (00-53)
    V             : Formatter.WeekOfYear02,  //  ISO week number, with Monday as first day of week (01..53)
    // W             : week number of the year, Monday as the first day of the week, padded to 2 digits (00-53)
    H             : Formatter.Hour2402,
    I             : Formatter.Hour1202,
    k             : Formatter.Hour24_2,
    l             : Formatter.Hour12_2,
    M             : Formatter.Minute02,
    S             : Formatter.Second02,
    s             : Formatter.SecondsEpoch,
    L             : Formatter.Milli03,
    N             : Formatter.Nano09,
    // o             :              // day of the month as an ordinal (without padding), e.g. 1st, 2nd, 3rd, 4th
    P             : Formatter.ampm,                                      //                          (based on locale)
    p             : Formatter.AMPM,                                      //                          (based on locale)
    c             : (dt) => strftime(dt, '%a %d %b %Y %r %Z'),  // %a %b %d %X %Y %Z  en_US (based on locale)
    D             : (dt) => strftime(dt, '%m/%d/%y'),           // %m/%d/%y           en_US (based on locale)
    F             : (dt) => strftime(dt, '%Y-%m-%d'),           // %Y-%m-%d           en_US (based on locale)
    R             : (dt) => strftime(dt, '%H:%M'),              // %H:%M              en_US (based on locale)
    r             : (dt) => strftime(dt, '%I:%M:%S %p'),        // %I:%M:%S %p        en_US (based on locale)
    T             : (dt) => strftime(dt, '%H:%M:%S'),           // %H:%M:%S           en_US (based on locale)
    v             : (dt) => strftime(dt, '%e-%b-%Y'),           // %e-%b-%Y           en_US (based on locale)
    X             : (dt) => strftime(dt, '%r'),                 // %T or %r           en_US (based on locale)
    x             : (dt) => strftime(dt, '%m/%d/%Y'),           // %D                 en_US (based on locale)
    Y             : Formatter.Year04,
    y             : Formatter.Year02,
    g             : Formatter.YearOfWeek02,  // last two digits of year of ISO week number (see %G)
    G             : Formatter.YearOfWeek04,  // year of ISO week number (see %V); normally useful only with %V
    C             : Formatter.Century,
    Z             : Formatter.TZShort,
    z             : Formatter.TZ04,
    n             : () => '\n',
    t             : () => '\t',
    '%'           : () => '%',
  },
};

export default function strftime(date: DateTimeLike, formatStr ?: string) {
  const str = formatStr ?? STRFTIME.FORMAT_DEFAULT;
  return str.replace(STRFTIME.REGEX_FORMAT, (match: string) => {
    const index   = match.slice(-1);
    // Lookup the value function from the map.  If no fn is returned ( shouldn't happen ) then guard with a fn that just returns the original match
    const fn      = STRFTIME.REPLACE_Formatter[index] ?? (() => match);
    // Utils.log('strftime', match, index, fn(date));
    return fn(date);
  }).trim();
}
