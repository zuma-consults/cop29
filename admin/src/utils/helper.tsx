import { DateTime } from "luxon";

// Function to format date from 'createdAt' field
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

export const formatDuration = (start: string, end: string) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const duration =
    Math.abs(endTime.getTime() - startTime.getTime()) / (1000 * 60); // duration in minutes

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours ? `${hours}h ` : ""}${minutes}m`;
};

export function formatDate1(dateString: any) {
  // Parse the input date string
  const parsedDate = DateTime.fromJSDate(new Date(dateString));

  // Format the date in a user-friendly way
  const formattedDate = parsedDate.toFormat(
    "cccc, LLLL dd, yyyy 'at' hh:mm:ss"
  );

  return formattedDate;
}
