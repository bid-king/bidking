export function AuctionDateParse(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDate = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (diffDate === 0) {
    return `오늘 ${hours}:${minutes}`;
  } else if (diffDate > 0) {
    return `${diffDate}일 후 ${hours}:${minutes}`;
  } else {
    return `${-diffDate}일 전 ${hours}:${minutes}`;
  }
}
