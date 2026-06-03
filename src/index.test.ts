// import * as test  from  'node:test';
import                  './index.js';


// type  DateTimeLike    = Temporal.PlainDate | Temporal.ZonedDateTime;
export const ZONE        = Temporal.Now.timeZoneId();
// const EXE             = Utils.execWait('where date.exe').stdout;
// Utils.log(EXE);


export const TEST_DATES   = {
  LEADING_ZEROES  : '2026-01-02T03:04:05',
  NO_ZEROES_24    : '2026-11-22T14:34:56',
};
