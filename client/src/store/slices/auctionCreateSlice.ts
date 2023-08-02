import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuctionItem {
  name: string;
  itemCategory: string;
  description: string;
  startPrice: string;
  ordering: number;
}

interface AuctionCreate {
  auctionTitle: string;
  startedAt: string;
  auctionRoomType: string;
  itemPermissionChecked: boolean;
  deliveryRulesChecked: boolean;
  items: AuctionItem[];
}

const initialState: AuctionCreate = {
  auctionTitle: '',
  startedAt: '',
  auctionRoomType: 'GENERAL',
  itemPermissionChecked: false,
  deliveryRulesChecked: false,
  items: [],
};

export const auctionCreateSlice = createSlice({
  name: 'auctionCreate',
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
    addItemToList: (state, action: PayloadAction<AuctionItem>) => {
      const index = state.items.findIndex(item => item.ordering === action.payload.ordering);
      if (index >= 0) {
        state.items[index] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
    resetAuctionCreate: state => initialState,
  },
});

export const {
  setAuctionTitle,
  setStartedAt,
  setAuctionRoomType,
  setItemPermissionChecked,
  setDeliveryRulesChecked,
  addItemToList,
  resetAuctionCreate,
} = auctionCreateSlice.actions;

export default auctionCreateSlice.reducer;
