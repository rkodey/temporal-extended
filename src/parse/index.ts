import  {
  ZONE,
} from  '../formatter/index.js';


const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;


export default function parse(inputStr  : string): Temporal.ZonedDateTime {
  const match     = inputStr.match(REGEX_PARSE);
  if (match) {
    const [, yr, mm, dd, hour, min, sec, milli] = match;

    // const year    = match[1];
    const year    = Number.parseInt(yr ?? '', 10) || 0;
    const month   = Math.max(Number.parseInt(mm ?? '', 10)  || 0, 1);
    const day     = Math.max(Number.parseInt(dd ?? '', 10)  || 0, 1);
    // const milli   = (match[7] || '0').slice(0, 3);
    // if (utc) {
    //   return new Date(Date.UTC(match[1], month, match[3] || 1, match[4] || 0, match[5] || 0, match[6] || 0, milli))
    // }
    return Temporal.ZonedDateTime.from({
      timeZone    : ZONE,
      year,
      month,
      day,
      hour        : Number.parseInt(hour  ?? '', 10)   || 0,
      minute      : Number.parseInt(min   ?? '', 10)    || 0,
      second      : Number.parseInt(sec   ?? '', 10)    || 0,
      millisecond : Number.parseInt(milli ?? '', 10)  || 0,
    });
    // return new Date(match[1], month, day, match[4] || 0, match[5] || 0, match[6] || 0, milli)
    //     new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
  }
  // dayjs uses Date parse as fallback
  return Temporal.Instant.fromEpochMilliseconds((new Date(inputStr)).valueOf()).toZonedDateTimeISO(ZONE);   // eslint-disable-line no-restricted-globals
}
