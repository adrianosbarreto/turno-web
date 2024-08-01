function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

export const getLast12Months = () => {
  const months = [];
  const currentDate = new Date();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthNumber = monthDate.getMonth() + 1;
    const year = monthDate.getFullYear();
    const monthYear = `${monthNames[monthDate.getMonth()]}, ${year}`;

    months.push({
      monthNumber,
      monthYear,
      year
    });
  }

  return months;
};

export const getMonthDayYear = (day:number, monthNumber: number, year: number) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return `${monthNames[monthNumber - 1]} ${day}, ${year}`;
};

export default formatDateTime;
