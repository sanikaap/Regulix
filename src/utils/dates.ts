import { differenceInDays, format, parseISO } from "date-fns";

export const formatDate = (date: string): string => {
  return format(parseISO(date), "MMM d, yyyy");
};

export const daysUntil = (date: string): number => {
  return differenceInDays(parseISO(date), new Date());
};

export const formatWeekRange = (start: string, end: string): string => {
  return `${format(parseISO(start), "MMM d")} – ${format(parseISO(end), "MMM d, yyyy")}`;
};
