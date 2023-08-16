export function auctionDateParse(dateString: string): string {
  const date = new Date(dateString);

  // 원본 시간 정보를 복사합니다.
  const originalHours = date.getHours();
  const originalMinutes = date.getMinutes();

  // 날짜만 비교하기 위해 시간 정보를 제거합니다.
  date.setHours(0, 0, 0, 0);

  const now = new Date();
  now.setHours(0, 0, 0, 0); // 현재의 시간 정보를 제거합니다.

  const diffDate = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const hours = String(originalHours).padStart(2, '0');
  const minutes = String(originalMinutes).padStart(2, '0');

  if (diffDate === 0) {
    return `오늘 ${hours}:${minutes}`;
  } else if (diffDate > 0) {
    return `${diffDate}일 후 ${hours}:${minutes}`;
  } else {
    return `${-diffDate}일 전 ${hours}:${minutes}`;
  }
}
