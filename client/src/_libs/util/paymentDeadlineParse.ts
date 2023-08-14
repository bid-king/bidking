export function paymentDeadlineParse(dueDateString: string): number {
  // 현재 날짜를 가져옵니다.
  const currentDate = new Date();
  // 주어진 날짜 문자열을 Date 객체로 변환합니다.
  const dueDate = new Date(dueDateString);

  // 두 날짜 간의 차이를 밀리초 단위로 계산합니다.
  const diffInMilliseconds = dueDate.getTime() - currentDate.getTime();
  // 밀리초를 일수로 변환하여 반환합니다.
  return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
}
