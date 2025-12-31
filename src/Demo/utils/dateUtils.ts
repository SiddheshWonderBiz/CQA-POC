export const getMonthsBetween = (
  months: string[],
  start: string,
  end: string
) => {
  const startIndex = months.indexOf(start);
  const endIndex = months.indexOf(end);

  if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
    return [];
  }

  return months.slice(startIndex, endIndex + 1);
};