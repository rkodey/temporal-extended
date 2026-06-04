import  * as TemporalEx   from  './functional.js';


// @TODO unicode formatting like date-fns
// @TODO use dayjs and strftime to replace tests, after moving to module


const ZONE        = Temporal.Now.timeZoneId();


interface ExtendedBase {
      format      : (formatStr  ? : string) => string
      strftime    : (formatStr  ? : string) => string
}


declare global {
  namespace Temporal {

    interface Instant extends ExtendedBase {
      isBefore    : (datetime : Temporal.Instant) => boolean
      isAfter     : (datetime : Temporal.Instant) => boolean
      isBetween   : (dateA    : Temporal.Instant,           dateB   : Temporal.Instant) => boolean
    }
    interface ZonedDateTime extends ExtendedBase {
      isBefore    : (datetime : Temporal.ZonedDateTimeLike) => boolean
      isAfter     : (datetime : Temporal.ZonedDateTimeLike) => boolean
      isBetween   : (dateA    : Temporal.ZonedDateTimeLike, dateB   : Temporal.ZonedDateTimeLike) => boolean
    }
    interface PlainDateTime extends ExtendedBase {
      isBefore    : (datetime : Temporal.PlainDateTimeLike) => boolean
      isAfter     : (datetime : Temporal.PlainDateTimeLike) => boolean
      isBetween   : (dateA    : Temporal.PlainDateTimeLike, dateB   : Temporal.PlainDateTimeLike) => boolean
    }
    interface PlainDate extends ExtendedBase {
      isBefore    : (datetime : Temporal.PlainDateLike) => boolean
      isAfter     : (datetime : Temporal.PlainDateLike) => boolean
      isBetween   : (dateA    : Temporal.PlainDateLike,     dateB   : Temporal.PlainDateLike) => boolean
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
// We don't leverage compare.ts here because Instant introduces a lot of typing complexities,
// so it feels better to use the native Instant compare function instead of converting toZonedDateTimeISO.
// The conversion are necessary for formatting since we need the individual values for output.
Temporal.Instant.prototype.isBefore ??= function isBefore(datetime) {
  return Temporal.Instant.compare(this, datetime) < 0;
};
Temporal.Instant.prototype.isAfter ??= function isAfter(datetime) {
  return Temporal.Instant.compare(this, datetime) > 0;
};
Temporal.Instant.prototype.isBetween ??= function isBetween(dateA, dateB) {
  return  (this.isAfter(dateA) && this.isBefore(dateB))
       || (this.isAfter(dateB) && this.isBefore(dateA));
};
Temporal.Instant.prototype.format ??= function formatInstant(str) {
  return TemporalEx.format(this.toZonedDateTimeISO(ZONE), str);
};
Temporal.Instant.prototype.strftime ??= function strftimeInstant(formatStr) {
  return TemporalEx.strftime(this.toZonedDateTimeISO(ZONE), formatStr);
};
Temporal.Instant.parse ??= function parseInstant(inputStr) {
  return TemporalEx.parse(inputStr).toInstant();
};


// ----- Temporal.ZonedDateTime
Temporal.ZonedDateTime.prototype.isBefore ??= function isBefore(datetime) {
  return TemporalEx.isBefore(this, datetime);
};
Temporal.ZonedDateTime.prototype.isAfter ??= function isAfter(datetime) {
  return TemporalEx.isAfter(this, datetime);
};
Temporal.ZonedDateTime.prototype.isBetween ??= function isBetween(dateA, dateB) {
  return TemporalEx.isBetween(this, dateA, dateB);
};
Temporal.ZonedDateTime.prototype.format ??= function formatZonedDateTime(str) {
  return TemporalEx.format(this, str);
};
Temporal.ZonedDateTime.prototype.strftime ??= function strftimeZonedDateTime(formatStr) {
  return TemporalEx.strftime(this, formatStr);
};
Temporal.ZonedDateTime.parse ??= function parseZonedDateTime(inputStr) {
  return TemporalEx.parse(inputStr);
};


// ----- Temporal.PlainDateTime
Temporal.PlainDateTime.prototype.isBefore ??= function isBefore(datetime) {
  return TemporalEx.isBefore(this, datetime);
};
Temporal.PlainDateTime.prototype.isAfter ??= function isAfter(datetime) {
  return TemporalEx.isAfter(this, datetime);
};
Temporal.PlainDateTime.prototype.isBetween ??= function isBetween(dateA, dateB) {
  return TemporalEx.isBetween(this, dateA, dateB);
};
Temporal.PlainDateTime.prototype.format ??= function formatPlainDateTime(formatStr) {
  return TemporalEx.format(this, formatStr);
};
Temporal.PlainDateTime.prototype.strftime ??= function strftimePlainDateTime(formatStr) {
  return TemporalEx.strftime(this, formatStr);
};
Temporal.PlainDateTime.parse ??= function parsePlainDateTime(inputStr) {
  return TemporalEx.parse(inputStr)?.toPlainDateTime();
};


// ----- Temporal.PlainDate
Temporal.PlainDate.prototype.isBefore ??= function isBefore(datetime) {
  return TemporalEx.isBefore(this, datetime);
};
Temporal.PlainDate.prototype.isAfter ??= function isAfter(datetime) {
  return TemporalEx.isAfter(this, datetime);
};
Temporal.PlainDate.prototype.isBetween ??= function isBetween(dateA, dateB) {
  return TemporalEx.isBetween(this, dateA, dateB);
};
Temporal.PlainDate.prototype.format ??= function formatPlainDate(formatStr) {
  return TemporalEx.format(this.toPlainDateTime(), formatStr);
};
Temporal.PlainDate.prototype.strftime ??= function strftimePlainDate(formatStr) {
  return TemporalEx.strftime(this.toPlainDateTime(), formatStr);
};
Temporal.PlainDate.parse ??= function parsePlainDate(inputStr) {
  return TemporalEx.parse(inputStr)?.toPlainDate();
};
