import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuctionItem {
  name: string;
  itemCategory: number;
  description: string;
  startPrice: number;
  ordering: number;
}

interface AuctionCreate {
  auctionTitle: string;
  startedAt: string;
  auctionRoomType: string;
  itemPermissionChecked: string;
  deliveryRulesChecked: string;
  itemList: AuctionItem[];
}

const initialState: AuctionCreate = {
  auctionTitle: '',
  startedAt: '',
  auctionRoomType: '',
  itemPermissionChecked: '',
  deliveryRulesChecked: '',
  itemList: [],
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
    setItemPermissionChecked: (state, action: PayloadAction<string>) => {
      state.itemPermissionChecked = action.payload;
    },
    setDeliveryRulesChecked: (state, action: PayloadAction<string>) => {
      state.deliveryRulesChecked = action.payload;
    },
    addItemToList: (state, action: PayloadAction<AuctionItem>) => {
      state.itemList.push(action.payload);
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
