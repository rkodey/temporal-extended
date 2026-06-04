
type DateTime         = Temporal.ZonedDateTime | Temporal.PlainDateTime;
type DateTimeLike     = Temporal.ZonedDateTimeLike | Temporal.PlainDateTimeLike;
type ReplaceFunction  = (dt: DateTime) => string;
