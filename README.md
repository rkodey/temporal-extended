
# Temporal Extended (WIP)

The extended object way
``` JavaScript
import  'temporal-extended';

Temporal.Now.zonedDateTimeISO().format('YYYY-MM-DD');
Temporal.Now.plainDateTimeISO().strftime('%Y-%m-%d');
Temporal.Now.plainDateISO().strftime('%F');

```


The functional way
``` JavaScript
import  format    from  'temporal-extended/format';
import  strftime  from  'temporal-extended/strftime';

format(Temporal.Now.zonedDateTimeISO(), 'YYYY-MM-DD');
strftime(Temporal.Now.plainDateTimeISO(), '%Y-%m-%d');
strftime(Temporal.Now.plainDateTimeISO(), '%F');
```

<br>

You can choose from two either interface, or use both:

1. Extend the Temporal date objects to include `format`, `strftime`, and other quality of life helper methods for a convenient readable interface.
1. Import individual ( tree-shakable? ) functions for `format`, `strftime`, and the rest of the helpers while leaving the Temporal objects unmodified.

<br>

## Why the need to Extend?

The new [JavaScript Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal)
API replacement for Date() is pretty nice.  It's very precise in its definition,
which also makes it very verbose.  I happen to like it that way.

While the proposed ( practically official ) API is very thorough and well designed,
apparently the committee assumed no one would ever need to output Temporal data to a user interface.

You see, there are these beings called Product Managers...
And they like to design user interfaces that don't necessarily conform to ISO spec.

So yeah...  We need a general purpose string formatter.

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
