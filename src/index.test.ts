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


/*
await test.suite('Temporal-Extended', async () => {


  test.test('compare  ZonedDateTime', (_ctx) => {
    const now       = Temporal.Now.zonedDateTimeISO();
    const yesterday = now.subtract('P1D');
    const tomorrow  = now.add('P1D');
    test.false(now.isAfter(now),        'now isAfter now');
    test.false(now.isAfter(tomorrow),   'now isAfter tomorrow');
    test.true(now.isAfter(yesterday),   'now isAfter yesterday');

    test.false(now.isBefore(now),       'now isBefore now');
    test.false(now.isBefore(yesterday), 'now isBefore yesterday');
    test.true(now.isBefore(tomorrow),   'now isBefore tomorrow');

    // test.true(now.equals(now),          'now equals now');
    // test.true(now.equals(tomorrow.subtract('P1D')));
    // test.true(now.equals(yesterday.add('P1D')));
  });

  test.test('compare  PlainDateTime', (_ctx) => {
    const now       = Temporal.Now.plainDateTimeISO();
    const yesterday = now.subtract('P1D');
    const tomorrow  = now.add('P1D');
    test.false(now.isAfter(now),        'now isAfter now');
    test.false(now.isAfter(tomorrow),   'now isAfter tomorrow');
    test.true(now.isAfter(yesterday),   'now isAfter yesterday');

    test.false(now.isBefore(now),       'now isBefore now');
    test.false(now.isBefore(yesterday), 'now isBefore yesterday');
    test.true(now.isBefore(tomorrow),   'now isBefore tomorrow');

    // test.true(now.equals(now),          'now equals now');
    // test.true(now.equals(tomorrow.subtract('P1D')));
    // test.true(now.equals(yesterday.add('P1D')));
  });

  test.test('compare  PlainDate', (_ctx) => {
    const now       = Temporal.Now.plainDateISO();
    const yesterday = now.subtract('P1D');
    const tomorrow  = now.add('P1D');
    test.false(now.isAfter(now),        'now isAfter now');
    test.false(now.isAfter(tomorrow),   'now isAfter tomorrow');
    test.true(now.isAfter(yesterday),   'now isAfter yesterday');

    test.false(now.isBefore(now),       'now isBefore now');
    test.false(now.isBefore(yesterday), 'now isBefore yesterday');
    test.true(now.isBefore(tomorrow),   'now isBefore tomorrow');

    // test.true(now.equals(now),          'now equals now');
    // test.true(now.equals(tomorrow.subtract('P1D')));
    // test.true(now.equals(yesterday.add('P1D')));
  });

});
*/
