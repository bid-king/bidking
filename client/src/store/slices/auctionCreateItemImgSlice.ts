import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuctionCreateItemImgs {
  itemImgs: File[];
}

const initialState: AuctionCreateItemImgs = {
  itemImgs: [],
};

export const auctionCreateItemImgSlice = createSlice({
  name: 'auctionCreateItemImg',
  initialState,
  reducers: {
    setItemImg: (state, action: PayloadAction<File>) => {
      state.itemImgs.push(action.payload);
    },
  },
});

export const { setItemImg } = auctionCreateItemImgSlice.actions;

export default auctionCreateItemImgSlice.reducer;
