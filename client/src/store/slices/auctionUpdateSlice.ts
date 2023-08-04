import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuctionItem {
  name: string;
  itemCategory: string;
  description: string;
  startPrice: string;
  ordering: number;
  itemId: number | undefined;
  isChanged: boolean;
}

export interface AuctionCreateItem {
  name: string;
  itemCategory: string;
  description: string;
  startPrice: string;
  ordering: number;
  isChanged: boolean;
}

interface AuctionUpdate {
  auctionTitle: string;
  startedAt: string;
  auctionRoomType: string;
  itemPermissionChecked: boolean;
  deliveryRulesChecked: boolean;
  items: (AuctionItem | AuctionCreateItem)[];
}

const initialState: AuctionUpdate = {
  auctionTitle: '',
  startedAt: '',
  auctionRoomType: 'GENERAL',
  itemPermissionChecked: false,
  deliveryRulesChecked: false,
  items: [],
};

export const auctionUpdateSlice = createSlice({
  name: 'auctionUpdate',
  initialState,
  reducers: {
    setAuctionTitle: (state, action: PayloadAction<string>) => {
      state.auctionTitle = action.payload;
    },
    setStartedAt: (state, action: PayloadAction<string>) => {
      state.startedAt = action.payload;
    },
    setAuctionRoomType: (state, action: PayloadAction<string>) => {
      state.auctionRoomType = action.payload;
    },
    setItemPermissionChecked: state => {
      state.itemPermissionChecked = !state.itemPermissionChecked;
    },
    setDeliveryRulesChecked: state => {
      state.deliveryRulesChecked = !state.deliveryRulesChecked;
    },
    setAuctionItem: (state, action: PayloadAction<AuctionItem[]>) => {
      state.items = action.payload;
    },
    addItemToList: (state, action: PayloadAction<AuctionItem>) => {
      const index = state.items.findIndex(item => item.ordering === action.payload.ordering);
      if (index >= 0) {
        state.items[index] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
    addCreateItemToList: (state, action: PayloadAction<AuctionCreateItem>) => {
      const index = state.items.findIndex(item => item.ordering === action.payload.ordering);
      if (index >= 0) {
        state.items[index] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
    resetAuctionUpdate: state => {
      state.auctionTitle = initialState.auctionTitle;
      state.startedAt = initialState.startedAt;
      state.auctionRoomType = initialState.auctionRoomType;
      state.itemPermissionChecked = initialState.itemPermissionChecked;
      state.deliveryRulesChecked = initialState.deliveryRulesChecked;
      state.items = initialState.items;
    },
  },
});

export const {
  setAuctionTitle,
  setStartedAt,
  setAuctionRoomType,
  setItemPermissionChecked,
  setDeliveryRulesChecked,
  addItemToList,
  resetAuctionUpdate,
  setAuctionItem,
  addCreateItemToList,
} = auctionUpdateSlice.actions;

export default auctionUpdateSlice.reducer;
