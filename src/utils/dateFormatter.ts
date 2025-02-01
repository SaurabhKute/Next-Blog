import moment from 'moment';

export function formatDate(date: string | Date): string {
  return moment(date).format("MMM DD, YYYY");
}
