import  * as test         from  'node:test';
import  assert            from  'node:assert';
import  DAYJS             from  'dayjs';
import  { TEST_DATES }    from  '../index.test.js';
import                          '../index.js';


// const TEST_DATES  = {
//   LEADING_ZEROES  : '2026-01-02T03:04:05',
//   NO_ZEROES_24    : '2026-11-22T14:34:56',
// };
const ZONE        = Temporal.Now.timeZoneId();
const LOOP        = 10_000;


await test.suite('Temporal-Extended benchmark', async () => {

  await test.test(`dayjs    ZonedDateTime:  Leading zeroes ${LOOP}`, (_ctx) => {
    const date  = DAYJS(TEST_DATES.LEADING_ZEROES);
    for (let i = 0; i < LOOP; i += 1) {
      assert.strictEqual(date.format(),                   '2026-01-02T03:04:05-05:00');
      assert.strictEqual(date.format(''),                 '2026-01-02T03:04:05-05:00');
      assert.strictEqual(date.format('YYYY YY'),          '2026 26');
      assert.strictEqual(date.format('MMMM MMM MM M'),    'January Jan 01 1');
      assert.strictEqual(date.format('DD D'),             '02 2');
      assert.strictEqual(date.format('dddd ddd dd d'),    'Friday Fri Fr 5');
      assert.strictEqual(date.format('HH H hh h A a'),    '03 3 03 3 AM am');
      assert.strictEqual(date.format('mm m ss s SSS'),    '04 4 05 5 000');
      assert.strictEqual(date.format('ZZ Z'),             '-0500 -05:00');
    }
  });
  await test.test(`format   ZonedDateTime:  Leading zeroes ${LOOP}`, (_ctx) => {
    const date  = Temporal.ZonedDateTime.from(`${TEST_DATES.LEADING_ZEROES}[${ZONE}]`);
    for (let i = 0; i < LOOP; i += 1) {
      assert.strictEqual(date.format(),                   '2026-01-02T03:04:05-05:00');
      assert.strictEqual(date.format(''),                 '2026-01-02T03:04:05-05:00');
      assert.strictEqual(date.format('YYYY YY'),          '2026 26');
      assert.strictEqual(date.format('MMMM MMM MM M'),    'January Jan 01 1');
      assert.strictEqual(date.format('DD D'),             '02 2');
      assert.strictEqual(date.format('dddd ddd dd d'),    'Friday Fri Fr 5');
      assert.strictEqual(date.format('HH H hh h A a'),    '03 3 03 3 AM am');
      assert.strictEqual(date.format('mm m ss s SSS'),    '04 4 05 5 000');
      assert.strictEqual(date.format('ZZ Z'),             '-0500 -05:00');
      // assert.strictEqual(date.format('Mo'),               '1st');
    }
  });

});


await test.suite('Temporal-Extended format', async () => {

  await test.test(`format   ZonedDateTime:  Leading zeroes ${LOOP}`, (_ctx) => {
    const date  = Temporal.ZonedDateTime.from(`${TEST_DATES.LEADING_ZEROES}[${ZONE}]`);
    // const dayjs = DAYJS(TEST_DATES.LEADING_ZEROES);
    assert.strictEqual(date.format(),                     '2026-01-02T03:04:05-05:00');
    assert.strictEqual(date.format(''),                   '2026-01-02T03:04:05-05:00');
    assert.strictEqual(date.format('YYYY YY'),            '2026 26');
    assert.strictEqual(date.format('MMMM MMM MM M'),      'January Jan 01 1');
    assert.strictEqual(date.format('DD D'),               '02 2');
    assert.strictEqual(date.format('dddd ddd dd d'),      'Friday Fri Fr 5');
    assert.strictEqual(date.format('HH H hh h A a'),      '03 3 03 3 AM am');
    assert.strictEqual(date.format('mm m ss s SSS'),      '04 4 05 5 000');
    assert.strictEqual(date.format('ZZ Z'),               '-0500 -05:00');
    // assert.strictEqual(date.format('Mo'),                 '1st');
  });
  await test.test('format   PlainDateTime:  Leading zeroes', (_ctx) => {
    const date  = Temporal.PlainDateTime.from(TEST_DATES.LEADING_ZEROES);
    assert.strictEqual(date.format(),                     '2026-01-02T03:04:05');
    assert.strictEqual(date.format(''),                   '2026-01-02T03:04:05');
    assert.strictEqual(date.format('YYYY YY'),            '2026 26');
    assert.strictEqual(date.format('MMMM MMM MM M'),      'January Jan 01 1');
    assert.strictEqual(date.format('DD D'),               '02 2');
    assert.strictEqual(date.format('dddd ddd dd d'),      'Friday Fri Fr 5');
    assert.strictEqual(date.format('HH H hh h A a'),      '03 3 03 3 AM am');
    assert.strictEqual(date.format('mm m ss s SSS'),      '04 4 05 5 000');
    assert.strictEqual(date.format('ZZ Z'),               '');
  });
  await test.test('format   PlainDate:      Leading zeroes', (_ctx) => {
    const date  = Temporal.PlainDate.from(TEST_DATES.LEADING_ZEROES);
    assert.strictEqual(date.format(),                     '2026-01-02T00:00:00');
    assert.strictEqual(date.format(''),                   '2026-01-02T00:00:00');
    assert.strictEqual(date.format('YYYY YY'),            '2026 26');
    assert.strictEqual(date.format('MMMM MMM MM M'),      'January Jan 01 1');
    assert.strictEqual(date.format('DD D'),               '02 2');
    assert.strictEqual(date.format('dddd ddd dd d'),      'Friday Fri Fr 5');
    assert.strictEqual(date.format('HH H hh h A a'),      '00 0 00 0 AM am');
    assert.strictEqual(date.format('mm m ss s SSS'),      '00 0 00 0 000');
    assert.strictEqual(date.format('ZZ Z'),               '');
  });


  await test.test('format   ZonedDateTime:  No zeroes with 24 hour time', (_ctx) => {
    const date  = Temporal.ZonedDateTime.from(`${TEST_DATES.NO_ZEROES_24}[${ZONE}]`);
    assert.strictEqual(date.format(),                     '2026-11-22T14:34:56-05:00');
    assert.strictEqual(date.format(''),                   '2026-11-22T14:34:56-05:00');
    assert.strictEqual(date.format('YYYY YY'),            '2026 26');
    assert.strictEqual(date.format('MMMM MMM MM M'),      'November Nov 11 11');
    assert.strictEqual(date.format('DD D'),               '22 22');
    assert.strictEqual(date.format('dddd ddd dd d'),      'Sunday Sun Su 0');
    assert.strictEqual(date.format('HH H hh h A a'),      '14 14 02 2 PM pm');
    assert.strictEqual(date.format('mm m ss s SSS'),      '34 34 56 56 000');
    assert.strictEqual(date.format('ZZ Z'),               '-0500 -05:00');
  });
  await test.test('format   PlainDateTime:  No zeroes with 24 hour time', (_ctx) => {
    const date  = Temporal.PlainDateTime.from(TEST_DATES.NO_ZEROES_24);
    assert.strictEqual(date.format(),                     '2026-11-22T14:34:56');
    assert.strictEqual(date.format(''),                   '2026-11-22T14:34:56');
    assert.strictEqual(date.format('YYYY YY'),            '2026 26');
    assert.strictEqual(date.format('MMMM MMM MM M'),      'November Nov 11 11');
    assert.strictEqual(date.format('DD D'),               '22 22');
    assert.strictEqual(date.format('dddd ddd dd d'),      'Sunday Sun Su 0');
    assert.strictEqual(date.format('HH H hh h A a'),      '14 14 02 2 PM pm');
    assert.strictEqual(date.format('mm m ss s SSS'),      '34 34 56 56 000');
    assert.strictEqual(date.format('ZZ Z'),               '');
  });
  await test.test('format   PlainDate:      No zeroes with 24 hour time', (_ctx) => {
    const date  = Temporal.PlainDate.from(TEST_DATES.NO_ZEROES_24);
    assert.strictEqual(date.format(),                     '2026-11-22T00:00:00');
    assert.strictEqual(date.format(''),                   '2026-11-22T00:00:00');
    assert.strictEqual(date.format('YYYY YY'),            '2026 26');
    assert.strictEqual(date.format('MMMM MMM MM M'),      'November Nov 11 11');
    assert.strictEqual(date.format('DD D'),               '22 22');
    assert.strictEqual(date.format('dddd ddd dd d'),      'Sunday Sun Su 0');
    assert.strictEqual(date.format('HH H hh h A a'),      '00 0 00 0 AM am');
    assert.strictEqual(date.format('mm m ss s SSS'),      '00 0 00 0 000');
    assert.strictEqual(date.format('ZZ Z'),               '');
  });

});
