
# Temporal Extended (WIP)

### The extended object way
``` JavaScript
import  'temporal-extended';

const now = Temporal.Now.zonedDateTimeISO();
const tomorrow = now.add({ days: 1 });

now.format('YYYY-MM-DD');             // 2026-06-01
now.strftime('%Y-%m-%d');             // 2026-06-01
now.strftime('Today is: %A');         // Today is: Monday

now.isBefore(tomorrow);               // true
now.isAfter(tomorrow);                // false
```


### The functional way
``` JavaScript
import    format              from  'temporal-extended/format';
import    strftime            from  'temporal-extended/strftime';
import  { isBefore, isAfter } from  'temporal-extended/compare';

const now = Temporal.Now.zonedDateTimeISO();
const tomorrow = now.add({ days: 1 });

format(now, 'YYYY-MM-DD');            // 2026-06-01
strftime(now, '%Y-%m-%d');            // 2026-06-01
strftime(now, 'Today is: %A');        // Today is: Monday

isBefore(now, tomorrow);              // true
isAfter(now, tomorrow);               // false
```

<br>

You can choose from either interface, or use both:

1. Extend the Temporal date objects for a convenient highly readable interface.
1. Import individual ( tree-shakable? ) functions while leaving the Temporal objects unmodified.

<br>

## Why do we need Temporal Extended?

The new [JavaScript Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal)
API replacement for Date() is pretty nice.  It's very precise in its definition,
which also makes it very verbose.  I happen to like it that way.

While the proposed ( practically official ) API is very thorough and well designed,
apparently the committee assumed no one would ever need to output Temporal data to a user interface.

You see, there are these beings called Product Managers...
And they like to design user interfaces that don't necessarily conform to ISO spec.

So yeah...  We need a general purpose string formatter.

<br>

## Is Temporal Extended safe?

- No automated CI/CD.
- No runtime dependencies. No supply-chain exposure.
- Temporal object extensions are purely additive and do not alter existing behavior.
- But if you're paranoid, you can use the functional interface!

<br>

## Provided Functions
Formatters and parsers
- `strftime` : the venerable formatter from C
- `format` : from `dayjs` / `moment.js`
- `parse` : from `dayjs`

Quality-of-Life Helpers
- `isBefore`
- `isAfter`
- `isBetween`
- ... more to come

<br>

## @TODO
- Add extended formats from moment.js into `format`
- Add a `unicode` formatter to match `date-fns`
- Add more optional helper function
- Add custom parser, based on either regex or format tokens, maybe both
