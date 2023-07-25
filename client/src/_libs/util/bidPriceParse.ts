export function bidPriceParse(price: string): string {
  const split: string[] = String(price).split('');

  const num = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return num;
}
