import    * as test       from  'node:test';
import    assert          from  'node:assert/strict';
import  { TEST_DATES }    from  './index.test.js';
import                          './index.js';


// const TEST_DATES      = {
//   LEADING_ZEROES      : '2026-01-02T03:04:05',
//   NO_ZEROES_24        : '2026-11-22T14:34:56',
// };
const ZONE            = Temporal.Now.timeZoneId();
const ALPHABET_Lower  = '%a %b %c %d %e %f %g %h %i %j %k %l %m %n %o %p %q %r %s %t %u %v %w %x %y %z';
const ALPHABET_Upper  = '%A %B %C %D %E %F %G %H %I %J %K %L %M %N %O %P %Q %R %S %T %U %V %W %X %Y %Z %%';


await test.suite('Temporal-Extended strftime', async () => {

  await test.test('ZonedDateTime:  Leading zeroes', (_ctx) => {
    const date  = Temporal.ZonedDateTime.from(`${TEST_DATES.LEADING_ZEROES}[${ZONE}]`);
    for (let i = 0; i < 200; i += 1) {
      assert.strictEqual(date.strftime(),                 'Fri 02 Jan 2026 03:04:05 AM EST');
      assert.strictEqual(date.strftime(''),               '');
      assert.strictEqual(date.strftime('%c'),             'Fri 02 Jan 2026 03:04:05 AM EST');
      assert.strictEqual(date.strftime('%Y %y %C'),       '2026 26 20');
      assert.strictEqual(date.strftime('%B %b %h %m'),    'January Jan Jan 01');
      assert.strictEqual(date.strftime('%d %e %j'),       '02  2 002');
      assert.strictEqual(date.strftime('%A %a %w'),       'Friday Fri 5');
      assert.strictEqual(date.strftime('%H %I %k %l'),    '03 03  3  3');
      assert.strictEqual(date.strftime('%M %S %s %L'),    '04 05 1767341045 000');
      assert.strictEqual(date.strftime('%P %p'),          'am AM');
      assert.strictEqual(date.strftime('%Z %z'),          'EST -0500');
      assert.strictEqual(date.strftime(ALPHABET_Lower),   'Fri Jan Fri 02 Jan 2026 03:04:05 AM EST 02  2 %f 26 Jan %i 002  3  3 01 \n %o AM 1 03:04:05 AM 1767341045 \t 5 2-Jan-2026 5 01/02/2026 26 -0500');
      assert.strictEqual(date.strftime(ALPHABET_Upper),   'Friday January 20 01/02/26 %E 2026-01-02 2026 03 03 %J %K 000 04 000000000 %O am %Q 03:04 05 03:04:05 %U 01 %W 03:04:05 AM 2026 EST %');
    }
  });
  await test.test('PlainDateTime:  Leading zeroes', (_ctx) => {
    const date  = Temporal.PlainDateTime.from(TEST_DATES.LEADING_ZEROES);
    assert.strictEqual(date.strftime(),                   'Fri 02 Jan 2026 03:04:05 AM');
    assert.strictEqual(date.strftime(''),                 '');
    assert.strictEqual(date.strftime('%c'),               'Fri 02 Jan 2026 03:04:05 AM');
    assert.strictEqual(date.strftime('%Y %y %C'),         '2026 26 20');
    assert.strictEqual(date.strftime('%B %b %h %m'),      'January Jan Jan 01');
    assert.strictEqual(date.strftime('%d %e %j'),         '02  2 002');
    assert.strictEqual(date.strftime('%A %a %w'),         'Friday Fri 5');
    assert.strictEqual(date.strftime('%H %I %k %l'),      '03 03  3  3');
    assert.strictEqual(date.strftime('%M %S %s %L'),      '04 05 0 000');
    assert.strictEqual(date.strftime('%P %p'),            'am AM');
    assert.strictEqual(date.strftime('%Z %z'),            '');
    assert.strictEqual(date.strftime(ALPHABET_Lower),     'Fri Jan Fri 02 Jan 2026 03:04:05 AM 02  2 %f 26 Jan %i 002  3  3 01 \n %o AM 1 03:04:05 AM 0 \t 5 2-Jan-2026 5 01/02/2026 26');
    assert.strictEqual(date.strftime(ALPHABET_Upper),     'Friday January 20 01/02/26 %E 2026-01-02 2026 03 03 %J %K 000 04 000000000 %O am %Q 03:04 05 03:04:05 %U 01 %W 03:04:05 AM 2026  %');
  });
  await test.test('PlainDate:      Leading zeroes', (_ctx) => {
    const date  = Temporal.PlainDate.from(TEST_DATES.LEADING_ZEROES);
    assert.strictEqual(date.strftime(),                   'Fri 02 Jan 2026 00:00:00 AM');
    assert.strictEqual(date.strftime(''),                 '');
    assert.strictEqual(date.strftime('%c'),               'Fri 02 Jan 2026 00:00:00 AM');
    assert.strictEqual(date.strftime('%Y %y %C'),         '2026 26 20');
    assert.strictEqual(date.strftime('%B %b %h %m'),      'January Jan Jan 01');
    assert.strictEqual(date.strftime('%d %e %j'),         '02  2 002');
    assert.strictEqual(date.strftime('%A %a %w'),         'Friday Fri 5');
    assert.strictEqual(date.strftime('%H %I %k %l'),      '00 00  0  0');
    assert.strictEqual(date.strftime('%M %S %s %L'),      '00 00 0 000');
    assert.strictEqual(date.strftime('%P %p'),            'am AM');
    assert.strictEqual(date.strftime('%Z %z'),            '');
    assert.strictEqual(date.strftime(ALPHABET_Lower),     'Fri Jan Fri 02 Jan 2026 00:00:00 AM 02  2 %f 26 Jan %i 002  0  0 01 \n %o AM 1 00:00:00 AM 0 \t 5 2-Jan-2026 5 01/02/2026 26');
    assert.strictEqual(date.strftime(ALPHABET_Upper),     'Friday January 20 01/02/26 %E 2026-01-02 2026 00 00 %J %K 000 00 000000000 %O am %Q 00:00 00 00:00:00 %U 01 %W 00:00:00 AM 2026  %');
  });


  await test.test('ZonedDateTime:  No zeroes with 24 hour time', (_ctx) => {
    const date  = Temporal.ZonedDateTime.from(`${TEST_DATES.NO_ZEROES_24}[${ZONE}]`);
    assert.strictEqual(date.strftime(),                   'Sun 22 Nov 2026 02:34:56 PM EST');
    assert.strictEqual(date.strftime(''),                 '');
    assert.strictEqual(date.strftime('%c'),               'Sun 22 Nov 2026 02:34:56 PM EST');
    assert.strictEqual(date.strftime('%Y %y %C'),         '2026 26 20');
    assert.strictEqual(date.strftime('%B %b %h %m'),      'November Nov Nov 11');
    assert.strictEqual(date.strftime('%d %e %j'),         '22 22 326');
    assert.strictEqual(date.strftime('%A %a %w'),         'Sunday Sun 0');
    assert.strictEqual(date.strftime('%H %I %k %l'),      '14 02 14  2');
    assert.strictEqual(date.strftime('%M %S %s %L'),      '34 56 1795376096 000');
    assert.strictEqual(date.strftime('%P %p'),            'pm PM');
    assert.strictEqual(date.strftime('%Z %z'),            'EST -0500');
    assert.strictEqual(date.strftime(ALPHABET_Lower),     'Sun Nov Sun 22 Nov 2026 02:34:56 PM EST 22 22 %f 26 Nov %i 326 14  2 11 \n %o PM 6 02:34:56 PM 1795376096 \t 7 22-Nov-2026 0 11/22/2026 26 -0500');
    assert.strictEqual(date.strftime(ALPHABET_Upper),     'Sunday November 20 11/22/26 %E 2026-11-22 2026 14 02 %J %K 000 34 000000000 %O pm %Q 14:34 56 14:34:56 %U 47 %W 02:34:56 PM 2026 EST %');
  });
  await test.test('PlainDateTime:  No zeroes with 24 hour time', (_ctx) => {
    const date  = Temporal.PlainDateTime.from(TEST_DATES.NO_ZEROES_24);
    assert.strictEqual(date.strftime(),                   'Sun 22 Nov 2026 02:34:56 PM');
    assert.strictEqual(date.strftime(''),                 '');
    assert.strictEqual(date.strftime('%c'),               'Sun 22 Nov 2026 02:34:56 PM');
    assert.strictEqual(date.strftime('%Y %y %C'),         '2026 26 20');
    assert.strictEqual(date.strftime('%B %b %h %m'),      'November Nov Nov 11');
    assert.strictEqual(date.strftime('%d %e %j'),         '22 22 326');
    assert.strictEqual(date.strftime('%A %a %w'),         'Sunday Sun 0');
    assert.strictEqual(date.strftime('%H %I %k %l'),      '14 02 14  2');
    assert.strictEqual(date.strftime('%M %S %s %L'),      '34 56 0 000');
    assert.strictEqual(date.strftime('%P %p'),            'pm PM');
    assert.strictEqual(date.strftime('%Z %z'),            '');
    assert.strictEqual(date.strftime(ALPHABET_Lower),     'Sun Nov Sun 22 Nov 2026 02:34:56 PM 22 22 %f 26 Nov %i 326 14  2 11 \n %o PM 6 02:34:56 PM 0 \t 7 22-Nov-2026 0 11/22/2026 26');
    assert.strictEqual(date.strftime(ALPHABET_Upper),     'Sunday November 20 11/22/26 %E 2026-11-22 2026 14 02 %J %K 000 34 000000000 %O pm %Q 14:34 56 14:34:56 %U 47 %W 02:34:56 PM 2026  %');
  });
  await test.test('PlainDate:      No zeroes with 24 hour time', (_ctx) => {
    const date  = Temporal.PlainDate.from(TEST_DATES.NO_ZEROES_24);
    assert.strictEqual(date.strftime(),                   'Sun 22 Nov 2026 00:00:00 AM');
    assert.strictEqual(date.strftime(''),                 '');
    assert.strictEqual(date.strftime('%c'),               'Sun 22 Nov 2026 00:00:00 AM');
    assert.strictEqual(date.strftime('%Y %y %C'),         '2026 26 20');
    assert.strictEqual(date.strftime('%B %b %h %m'),      'November Nov Nov 11');
    assert.strictEqual(date.strftime('%d %e %j'),         '22 22 326');
    assert.strictEqual(date.strftime('%A %a %w'),         'Sunday Sun 0');
    assert.strictEqual(date.strftime('%H %I %k %l'),      '00 00  0  0');
    assert.strictEqual(date.strftime('%M %S %s %L'),      '00 00 0 000');
    assert.strictEqual(date.strftime('%P %p'),            'am AM');
    assert.strictEqual(date.strftime('%Z %z'),            '');
    assert.strictEqual(date.strftime(ALPHABET_Lower),     'Sun Nov Sun 22 Nov 2026 00:00:00 AM 22 22 %f 26 Nov %i 326  0  0 11 \n %o AM 6 00:00:00 AM 0 \t 7 22-Nov-2026 0 11/22/2026 26');
    assert.strictEqual(date.strftime(ALPHABET_Upper),     'Sunday November 20 11/22/26 %E 2026-11-22 2026 00 00 %J %K 000 00 000000000 %O am %Q 00:00 00 00:00:00 %U 47 %W 00:00:00 AM 2026  %');
  });

});
