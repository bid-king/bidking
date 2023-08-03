export interface OriginalItem {
  category: string;
  itemDescription: string;
  itemId: number;
  itemImageUrl: string;
  itemName: string;
  itemOrdering: number;
  itemState: string;
  startPrice: number;
  successMemberId: null | number;
  successMemberNickname: null | string;
  successPrice: null | number;
  successTime: null | string;
}

export interface AuctionItem {
  name: string;
  itemCategory: string;
  description: string;
  startPrice: string;
  ordering: number;
}

export function transformToAuctionItem(originalItem: OriginalItem): AuctionItem {
  return {
    name: originalItem.itemName,
    itemCategory: originalItem.category,
    description: originalItem.itemDescription,
    startPrice: originalItem.startPrice.toString(),
    ordering: originalItem.itemOrdering,
  };
}
