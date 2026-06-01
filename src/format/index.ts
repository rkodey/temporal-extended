import  {
  type DateTimeLike,
  type ReplaceFunction,
  Formatter,
} from  '../formatter/index.js';


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


export default function format(date: DateTimeLike, formatStr ?: string) {
  const str = formatStr || DAYJS.FORMAT_DEFAULT;    // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
  return str.replace(DAYJS.REGEX_FORMAT, (match: string, escaped_string: string) => {
    const fn      = DAYJS.FN_MAP[match] ?? (() => match);
    return escaped_string || fn(date);
  }).trim();
}
