const formatDateISO = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`; // ISO 8601 format
};

export const getDateFilters = () => {
  const today = new Date();

  // Today
  const startOfToday = new Date(today);

  // This Week (Monday → Today)
  const startOfWeek = new Date(today);
  const dayOfWeek = startOfWeek.getDay() || 7; // Sunday = 7
  startOfWeek.setDate(today.getDate() - dayOfWeek + 1);

  // This Month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Last Month
  const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  return {
    today: {
      from: formatDateISO(startOfToday),
      to: formatDateISO(startOfToday),
    },
    week: {
      from: formatDateISO(startOfWeek),
      to: formatDateISO(today),
    },
    month: {
      from: formatDateISO(startOfMonth),
      to: formatDateISO(today),
    },
    last_month: {
      from: formatDateISO(startOfLastMonth),
      to: formatDateISO(endOfLastMonth),
    },
  };
};
