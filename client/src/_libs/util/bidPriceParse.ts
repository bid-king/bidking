/**입력한 input값을 세 자리 단위로 끊어 쉼표(,)를 찍어 리턴합니다. */
export function bidPriceParse(price: number): string {
  const str = price.toString();
  const num = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num;
}

/**자동입찰가를 리턴합니다. 자동입찰가는 현재 입찰가의 10%이며, 1원 단위는 버립니다. */
export function askingPriceParse(price: number): string {
  return String(Math.floor((price * 1.1) / 10) * 10);
}

/**숫자만 입력했는지 검증합니다. */
export function validateBidPrice(price: string): boolean {
  const check = /^\d+$/;
  if (!check.test(price)) return false;
  if (price.length > 12) return false;
  return true;
}

/**입찰 시도가 올바른지 검증합니다. 초기화할 상태의 setter, 현재 가격, 최소 호가, 입찰 성공 후 다음에 할 동작을 입력받습니다.*/
export function tryBid(
  init: (arg: string) => void,
  currPrice: number,
  asking: number,
  price: number,
  setAlert: (arg: string) => void
): boolean {
  init('');
  if (price === 0) {
    setAlert('입찰가를 입력해야 해요');
    return false;
  }
  if (Number(price) <= currPrice) {
    setAlert('입찰가는 현재 가격보다 높아야 해요');
    return false;
  }
  return true;
}
