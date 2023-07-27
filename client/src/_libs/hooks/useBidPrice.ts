import { useEffect, useState } from 'react';
import { bidPriceParse } from '../util/bidPriceParse';

export function useBidPrice(): [string[], string, string, Error | null] {
  const [prev, setPrev] = useState<string>('0');
  const [curr, setCurr] = useState<string>('1154467');
  const [priceArr, setPriceArr] = useState<string[]>(['100']);
  const [err, setErr] = useState<Error | null>(null);
  useEffect(() => {
    //Socket Call
    setPrev(curr);
    setCurr(prev); //새로운 데이터
    setPriceArr(bidPriceParse(curr).split(''));
  }, []);

  return [priceArr, prev, curr, err];
}
