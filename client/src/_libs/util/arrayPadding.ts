import { LiveItem, liveItemList } from '../../api/live';

export function arrayPadding(arr: liveItemList, pad: LiveItem, padding: number) {
  const list = [...arr];
  for (let i = 0; i < padding; i++) {
    list.push(pad);
    list.unshift(pad);
  }
  return list;
}
