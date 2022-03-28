export const START_DATE = new Date(2022, 0, 0) // not daylight saving time
const date = new Date();
/**
 * Checks whether a given date is in daylight saving time.
 * @param date the date object to be checked.
 * @returns true if the date is in daylight saving time, false if it's not.
 */
const isDST = (date: Date) => {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    const standardTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    return date.getTimezoneOffset() < standardTimezoneOffset;
}
// Patch now to ignore DST, matching START_DATE (not DST)
const now = isDST(date) ? new Date(+date + 3600000).valueOf() : date.valueOf();
export const dayNo = Math.floor((now - +START_DATE) / 86400000)
