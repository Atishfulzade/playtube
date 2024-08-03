import { format } from "date-fns";
export const formattedDate = (dateStr) => {
  const dateObj = new Date(dateStr);

  return format(dateObj, "MMM dd, yyyy");
};
