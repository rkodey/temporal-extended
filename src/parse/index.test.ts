import  * as test       from  'node:test';
import  assert          from 'node:assert';
import                  '../index.js';


await test.suite('Temporal-Extended parse', async () => {

  await test.test('parse    Instant', (_ctx) => {
    assert.strictEqual(Temporal.Instant.parse('2026')?.format(),                            '2026-01-01T00:00:00-05:00');
    assert.strictEqual(Temporal.Instant.parse('2026-11')?.format(),                         '2026-11-01T00:00:00-04:00');
    assert.strictEqual(Temporal.Instant.parse('2026-11-11')?.format(),                      '2026-11-11T00:00:00-05:00');
    assert.strictEqual(Temporal.Instant.parse('2026-11-11 22')?.format(),                   '2026-11-11T22:00:00-05:00');
    assert.strictEqual(Temporal.Instant.parse('2026-11-11 22:33')?.format(),                '2026-11-11T22:33:00-05:00');
    assert.strictEqual(Temporal.Instant.parse('2026-11-11 22:33:44')?.format(),             '2026-11-11T22:33:44-05:00');
    assert.strictEqual(Temporal.Instant.parse('2026-11-11 22:33:44-05:00')?.format(),       '2026-11-11T22:33:44-05:00');
  });
  await test.test('parse    ZonedDateTime', (_ctx) => {
    assert.strictEqual(Temporal.ZonedDateTime.parse('2026')?.format(),                      '2026-01-01T00:00:00-05:00');
    assert.strictEqual(Temporal.ZonedDateTime.parse('2026-11')?.format(),                   '2026-11-01T00:00:00-04:00');
    assert.strictEqual(Temporal.ZonedDateTime.parse('2026-11-11')?.format(),                '2026-11-11T00:00:00-05:00');
    assert.strictEqual(Temporal.ZonedDateTime.parse('2026-11-11 22')?.format(),             '2026-11-11T22:00:00-05:00');
    assert.strictEqual(Temporal.ZonedDateTime.parse('2026-11-11 22:33')?.format(),          '2026-11-11T22:33:00-05:00');
    assert.strictEqual(Temporal.ZonedDateTime.parse('2026-11-11 22:33:44')?.format(),       '2026-11-11T22:33:44-05:00');
    assert.strictEqual(Temporal.ZonedDateTime.parse('2026-11-11 22:33:44-05:00')?.format(), '2026-11-11T22:33:44-05:00');
  });
  await test.test('parse    PlainDateTime', (_ctx) => {
    assert.strictEqual(Temporal.PlainDateTime.parse('2026')?.format(),                      '2026-01-01T00:00:00');
    assert.strictEqual(Temporal.PlainDateTime.parse('2026-11')?.format(),                   '2026-11-01T00:00:00');
    assert.strictEqual(Temporal.PlainDateTime.parse('2026-11-11')?.format(),                '2026-11-11T00:00:00');
    assert.strictEqual(Temporal.PlainDateTime.parse('2026-11-11 22')?.format(),             '2026-11-11T22:00:00');
    assert.strictEqual(Temporal.PlainDateTime.parse('2026-11-11 22:33')?.format(),          '2026-11-11T22:33:00');
    assert.strictEqual(Temporal.PlainDateTime.parse('2026-11-11 22:33:44')?.format(),       '2026-11-11T22:33:44');
    assert.strictEqual(Temporal.PlainDateTime.parse('2026-11-11 22:33:44-05:00')?.format(), '2026-11-11T22:33:44');
  });
  await test.test('parse    PlainDate', (_ctx) => {
    assert.strictEqual(Temporal.PlainDate.parse('2026')?.format(),                          '2026-01-01T00:00:00');
    assert.strictEqual(Temporal.PlainDate.parse('2026-11')?.format(),                       '2026-11-01T00:00:00');
    assert.strictEqual(Temporal.PlainDate.parse('2026-11-11')?.format(),                    '2026-11-11T00:00:00');
    assert.strictEqual(Temporal.PlainDate.parse('2026-11-11 22')?.format(),                 '2026-11-11T00:00:00');
    assert.strictEqual(Temporal.PlainDate.parse('2026-11-11 22:33')?.format(),              '2026-11-11T00:00:00');
    assert.strictEqual(Temporal.PlainDate.parse('2026-11-11 22:33:44')?.format(),           '2026-11-11T00:00:00');
    assert.strictEqual(Temporal.PlainDate.parse('2026-11-11 22:33:44-05:00')?.format(),     '2026-11-11T00:00:00');
  });

});
