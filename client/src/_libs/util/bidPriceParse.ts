export function bidPriceParse(price: string): string {
  const num = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num;
}
