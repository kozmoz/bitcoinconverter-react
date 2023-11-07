import {DateTimeOptions} from 'vue-i18n';

/**
 * Filter that shows the time as HH:mm.
 *
 * @param date The date-time object
 * @return The time in HH:mm format or empty string
 */
export function timeFilter(date: Date): string {
  // Show the time as HH:mm from Date object.
  return date ? date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : '';
}

export function dateFilter(date: Date, locale: string): string {
  // Show the date as YYYY-MM-DD from Date object.
  //return date ? date.toISOString().substring(0, 10) : '';
  if (!date) {
    return '';
  }
  const options = {year: 'numeric', month: '2-digit', day: '2-digit'} as DateTimeOptions;
  if (locale === 'nl') {
    return date.toLocaleDateString('nl-NL', options);
  }
  return date.toLocaleDateString('en-GB', options);
}