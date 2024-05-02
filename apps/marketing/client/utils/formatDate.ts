import { format, parseISO } from 'date-fns';

export function formatDate(date: string) {
  const timestamp = parseISO(date);
  try {
    return format(timestamp, 'MMM dd, yyyy');
  } catch (error: any) {
    console.warn(`${error.message} while formatting timestamp.`);
    return null;
  }
}
