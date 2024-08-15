import { DateTime } from "luxon";

export function formatDate(dateString: any) {
  // Parse the input date string
  const parsedDate = DateTime.fromISO(dateString);

  // Format the date as "DD/MM/YYYY"
  const formattedDate = parsedDate.toFormat("dd/MM/yyyy");

  return formattedDate;
}

export function formatDate1(dateString: any) {
  // Parse the input date string
  const parsedDate = DateTime.fromJSDate(new Date(dateString));

  // Format the date in a user-friendly way
  const formattedDate = parsedDate.toFormat(
    "cccc, LLLL dd, yyyy 'at' hh:mm:ss",
  );

  return formattedDate;
}