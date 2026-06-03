
export type DateTimeLike    = Temporal.ZonedDateTime | Temporal.PlainDateTime;
export type ReplaceFunction = (dt: DateTimeLike) => string;


type FormatKeys = 'Year02'|'Year04'|'Century'|'YearOfWeek02'|'YearOfWeek04'|
                  'Month1'|'Month02'|'MonthShort'|'MonthLong'|
                  'Day1'|'Day02'|'Day_2'|'DayOfWeek0'|'DayOfWeek1'|'DayOfYear03'|
                  'WeekDaySh'|'WeekDayShort'|'WeekDayLong'|'Quarter1'|'WeekOfYear02'|
                  'Hour241'|'Hour2402'|'Hour24_2'|'Hour121'|'Hour1202'|'Hour12_2'|
                  'ampm'|'AMPM'|
                  'Minute1'|'Minute02'|
                  'Second1'|'Second02'|'SecondsEpoch'|'Milli03'|'Nano09'|'MilliEpoch'|
                  'TZ05'|'TZ04'|'TZShort'|'TZLong';


// Initialize Intl once at startup
export const ZONE   = Temporal.Now.timeZoneId();
export const LOCALE = new Intl.DateTimeFormat().resolvedOptions().locale;
const MONTH_SHORT   = new Intl.DateTimeFormat(LOCALE, { month: 'short' });
const MONTH_LONG    = new Intl.DateTimeFormat(LOCALE, { month: 'long' });
const WEEKDAY_SHORT = new Intl.DateTimeFormat(LOCALE, { weekday: 'short' });
const WEEKDAY_LONG  = new Intl.DateTimeFormat(LOCALE, { weekday: 'long' });
const ZONE_SHORT    = new Intl.DateTimeFormat(LOCALE, { timeZoneName: 'short' });
const ZONE_LONG     = new Intl.DateTimeFormat(LOCALE, { timeZoneName: 'long' });


// Using a Map was slightly faster than Record, but not worth the extra required verbosity for strong typing
// const FN_MAP    = new Map(Object.entries({
export const Formatter : Record<FormatKeys, ReplaceFunction> = {
  Year02        : (dt) => String(dt.year).padStart(2, '0').slice(-2),
  Year04        : (dt) => String(dt.year).padStart(4, '0'),
  Century       : (dt) => String(Math.trunc(dt.year / 100)).padStart(2, '0'),
  YearOfWeek02  : (dt) => String(dt.yearOfWeek).padStart(2, '0').slice(-2),
  YearOfWeek04  : (dt) => String(dt.yearOfWeek).padStart(4, '0'),
  Month1        : (dt) => String(dt.month),
  Month02       : (dt) => String(dt.month).padStart(2, '0'),
  MonthShort    : (dt) => MONTH_SHORT.format('offset' in dt ? dt.epochMilliseconds : dt),
  MonthLong     : (dt) => MONTH_LONG.format('offset' in dt ? dt.epochMilliseconds : dt),
  Day1          : (dt) => String(dt.day),
  Day02         : (dt) => String(dt.day).padStart(2, '0'),
  Day_2         : (dt) => String(dt.day).padStart(2, ' '),
  DayOfWeek0    : (dt) => String(dt.dayOfWeek === dt.daysInWeek ? 0 : dt.dayOfWeek),  // 0-based
  DayOfWeek1    : (dt) => String(dt.dayOfWeek),  // 1-based
  DayOfYear03   : (dt) => String(dt.dayOfYear).padStart(3, '0'),
  WeekDaySh     : (dt) => WEEKDAY_SHORT.format('offset' in dt ? dt.epochMilliseconds : dt).slice(0, 2),
  WeekDayShort  : (dt) => WEEKDAY_SHORT.format('offset' in dt ? dt.epochMilliseconds : dt),
  WeekDayLong   : (dt) => WEEKDAY_LONG.format('offset' in dt ? dt.epochMilliseconds : dt),
  Quarter1      : (dt) => String(Math.trunc(dt.day / 4) + 1),
  WeekOfYear02  : (dt) => String(dt.weekOfYear).padStart(2, '0'),
  Hour241       : (dt) => String(dt.hour),
  Hour2402      : (dt) => String(dt.hour).padStart(2, '0'),
  Hour24_2      : (dt) => String(dt.hour).padStart(2, ' '),
  Hour121       : (dt) => String(((dt.hour - 1) % 12) + 1),
  Hour1202      : (dt) => String(((dt.hour - 1) % 12) + 1).padStart(2, '0'),
  Hour12_2      : (dt) => String(((dt.hour - 1) % 12) + 1).padStart(2, ' '),
  ampm          : (dt) => (dt.hour < 12 ? 'am' : 'pm'),
  AMPM          : (dt) => (dt.hour < 12 ? 'AM' : 'PM'),
  Minute1       : (dt) => String(dt.minute),
  Minute02      : (dt) => String(dt.minute).padStart(2, '0'),
  Second1       : (dt) => String(dt.second),
  Second02      : (dt) => String(dt.second).padStart(2, '0'),
  Milli03       : (dt) => String(dt.millisecond).padStart(3, '0'),
  Nano09        : (dt) => String(dt.nanosecond).padStart(9, '0'),
  MilliEpoch    : (dt) => String('offset' in dt ? dt.epochMilliseconds : 0),
  SecondsEpoch  : (dt) => String('offset' in dt ? Math.trunc(dt.epochMilliseconds) / 1000 : 0),
  TZ05          : (dt) => ('offset' in dt ? dt.offset : ''),
  TZ04          : (dt) => ('offset' in dt ? dt.offset.replace(':', '') : ''),
  // TZShort       : (dt) => ZONE_SHORT.format('offset' in dt ? dt.epochMilliseconds : dt),
  // TZLong        : (dt) => ZONE_LONG.format('offset' in dt ? dt.epochMilliseconds : dt),
  TZShort       : (dt) => {
    if ('offset' in dt) {
      const parts = ZONE_SHORT.formatToParts(dt.epochMilliseconds);
      return parts.find((part) => part.type === 'timeZoneName')?.value ?? '';
    }
    return '';
  },
  TZLong        : (dt) => {
    if ('offset' in dt) {
      const parts = ZONE_LONG.formatToParts(dt.epochMilliseconds);
      return parts.find((part) => part.type === 'timeZoneName')?.value ?? '';
    }
    return '';
  },
};
