import  * as test         from  'node:test';
import  assert            from  'node:assert/strict';
import                          './index.js';


await test.suite('Temporal-Extended compare', async () => {

  await test.test('compare  ZonedDateTime', (_ctx) => {
    const now       = Temporal.Now.zonedDateTimeISO();
    const yesterday = now.subtract('P1D');
    const tomorrow  = now.add('P1D');
    assert.strictEqual(now.isAfter(now),        false,  'isAfter');
    assert.strictEqual(now.isAfter(tomorrow),   false,  'isAfter');
    assert.strictEqual(now.isAfter(yesterday),  true,   'isAfter');

    assert.strictEqual(now.isBefore(now),       false,  'isBefore');
    assert.strictEqual(now.isBefore(yesterday), false,  'isBefore');
    assert.strictEqual(now.isBefore(tomorrow),  true,   'isBefore');

    assert.strictEqual(now.isBetween(yesterday, tomorrow),  true, 'isBetween');
    assert.strictEqual(now.isBetween(tomorrow,  yesterday), true, 'isBetween');
  });

  await test.test('compare  PlainDateTime', (_ctx) => {
    const now       = Temporal.Now.plainDateTimeISO();
    const yesterday = now.subtract('P1D');
    const tomorrow  = now.add('P1D');
    assert.strictEqual(now.isAfter(now),        false,  'isAfter');
    assert.strictEqual(now.isAfter(tomorrow),   false,  'isAfter');
    assert.strictEqual(now.isAfter(yesterday),  true,   'isAfter');

    assert.strictEqual(now.isBefore(now),       false,  'isBefore');
    assert.strictEqual(now.isBefore(yesterday), false,  'isBefore');
    assert.strictEqual(now.isBefore(tomorrow),  true,   'isBefore');

    assert.strictEqual(now.isBetween(yesterday, tomorrow),  true, 'isBetween');
    assert.strictEqual(now.isBetween(tomorrow,  yesterday), true, 'isBetween');
  });

  await test.test('compare  PlainDate', (_ctx) => {
    const now       = Temporal.Now.plainDateISO();
    const yesterday = now.subtract('P1D');
    const tomorrow  = now.add('P1D');
    assert.strictEqual(now.isAfter(now),        false,  'isAfter');
    assert.strictEqual(now.isAfter(tomorrow),   false,  'isAfter');
    assert.strictEqual(now.isAfter(yesterday),  true,   'isAfter');

    assert.strictEqual(now.isBefore(now),       false,  'isBefore');
    assert.strictEqual(now.isBefore(yesterday), false,  'isBefore');
    assert.strictEqual(now.isBefore(tomorrow),  true,   'isBefore');

    assert.strictEqual(now.isBetween(yesterday, tomorrow),  true, 'isBetween');
    assert.strictEqual(now.isBetween(tomorrow,  yesterday), true, 'isBetween');
  });

});
