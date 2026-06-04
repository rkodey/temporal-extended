
export function isBefore(target: DateTimeLike, date2: DateTimeLike) {
  return Temporal.PlainDateTime.compare(target, date2) < 0;
}

export function isAfter(target: DateTimeLike, date2: DateTimeLike) {
  return Temporal.PlainDateTime.compare(target, date2) > 0;
}

export function isBetween(target: DateTimeLike, date1: DateTimeLike, date2: DateTimeLike) {
  return  (isAfter(target, date1) && isBefore(target, date2))
       || (isAfter(target, date2) && isBefore(target, date1));
}
