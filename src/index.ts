import  format    from  './format.js';
import  strftime  from  './strftime.js';
import  parse     from  './parse.js';
import  { ZONE }  from  './formatter.js';


// @TODO compare: isBetween
// @TODO unicode formatting like date-fns
// @TODO use dayjs and strftime to replace tests, after moving to module
// @NEXT create helper function(s) to combine the DateTimeFormat calls, and create cached responses


interface ExtendedBase {
      format      : (formatStr  ? : string) => string
      strftime    : (formatStr  ? : string) => string
}


declare global {
  namespace Temporal {
    interface Instant extends ExtendedBase {
      isBefore    : (datetime : Temporal.Instant) => boolean
      isAfter     : (datetime : Temporal.Instant) => boolean
    }
    interface ZonedDateTime extends ExtendedBase {
      isBefore    : (datetime : Temporal.ZonedDateTimeLike) => boolean
      isAfter     : (datetime : Temporal.ZonedDateTimeLike) => boolean
    }
    interface PlainDateTime extends ExtendedBase {
      isBefore    : (datetime : Temporal.PlainDateTimeLike) => boolean
      isAfter     : (datetime : Temporal.PlainDateTimeLike) => boolean
    }
    interface PlainDate extends ExtendedBase {
      isBefore    : (datetime : Temporal.PlainDateLike) => boolean
      isAfter     : (datetime : Temporal.PlainDateLike) => boolean
    }
    interface InstantConstructor {
      parse       : (inputStr : string) => Temporal.Instant | undefined;
    }
    interface ZonedDateTimeConstructor {
      parse       : (inputStr : string) => Temporal.ZonedDateTime | undefined;
    }
    interface PlainDateTimeConstructor {
      parse       : (inputStr : string) => Temporal.PlainDateTime | undefined;
    }
    interface PlainDateConstructor {
      parse       : (inputStr : string) => Temporal.PlainDate | undefined;
    }
  }
}


// ----- Temporal.Instant
Temporal.Instant.prototype.isBefore ??= function isBefore(datetime) {
  return Temporal.Instant.compare(this, datetime) < 0;
};
Temporal.Instant.prototype.isAfter ??= function isAfter(datetime) {
  return Temporal.Instant.compare(this, datetime) > 0;
};
Temporal.Instant.prototype.format ??= function formatInstant(str) {
  return format(this.toZonedDateTimeISO(ZONE), str);
};
Temporal.Instant.prototype.strftime ??= function strftimeInstant(formatStr) {
  return strftime(this.toZonedDateTimeISO(ZONE), formatStr);
};
Temporal.Instant.parse ??= function parseInstant(inputStr) {
  return parse(inputStr).toInstant();
};


// ----- Temporal.ZonedDateTime
Temporal.ZonedDateTime.prototype.isBefore ??= function isBefore(datetime) {
  return Temporal.ZonedDateTime.compare(this, datetime) < 0;
};
Temporal.ZonedDateTime.prototype.isAfter ??= function isAfter(datetime) {
  return Temporal.ZonedDateTime.compare(this, datetime) > 0;
};
Temporal.ZonedDateTime.prototype.format ??= function formatZonedDateTime(str) {
  return format(this, str);
};
Temporal.ZonedDateTime.prototype.strftime ??= function strftimeZonedDateTime(formatStr) {
  return strftime(this, formatStr);
};
Temporal.ZonedDateTime.parse ??= function parseZonedDateTime(inputStr) {
  return parse(inputStr);
};


// ----- Temporal.PlainDateTime
Temporal.PlainDateTime.prototype.isBefore ??= function isBefore(datetime) {
  return Temporal.PlainDateTime.compare(this, datetime) < 0;
};
Temporal.PlainDateTime.prototype.isAfter ??= function isAfter(datetime) {
  return Temporal.PlainDateTime.compare(this, datetime) > 0;
};
Temporal.PlainDateTime.prototype.format ??= function formatPlainDateTime(formatStr) {
  return format(this, formatStr);
};
Temporal.PlainDateTime.prototype.strftime ??= function strftimePlainDateTime(formatStr) {
  return strftime(this, formatStr);
};
Temporal.PlainDateTime.parse ??= function parsePlainDateTime(inputStr) {
  return parse(inputStr)?.toPlainDateTime();
};


// ----- Temporal.PlainDate
Temporal.PlainDate.prototype.isBefore ??= function isBefore(datetime) {
  return Temporal.PlainDate.compare(this, datetime) < 0;
};
Temporal.PlainDate.prototype.isAfter ??= function isAfter(datetime) {
  return Temporal.PlainDate.compare(this, datetime) > 0;
};
Temporal.PlainDate.prototype.format ??= function formatPlainDate(formatStr) {
  return format(this.toPlainDateTime(), formatStr);
};
Temporal.PlainDate.prototype.strftime ??= function strftimePlainDate(formatStr) {
  return strftime(this.toPlainDateTime(), formatStr);
};
Temporal.PlainDate.parse ??= function parsePlainDate(inputStr) {
  return parse(inputStr)?.toPlainDate();
};
