type formatDateRangeProps = {
  from?: string;
  to?: string;
};

export const formatDate = (date?: string) => {
  if (!date) return '';
  const d = /^\d+$/.test(date) ? new Date(Number(date)) : new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatDateForInput = (dateStr?: string) => {
  if (!dateStr) return undefined;
  const date = new Date(dateStr);
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - tzOffset)
    .toISOString()
    .slice(0, 16);
  return localISOTime;
};

const formatDateRange = ({ from, to }: formatDateRangeProps) =>
  [
    ...[from ? `From ${from}` : ''],
    ...[to ? `${from ? 'to' : 'To'} ${to}` : ''],
  ]
    .filter(Boolean)
    .join(' ');

export default formatDateRange;
