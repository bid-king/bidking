import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuctionCreateItemImgs {
  itemImgs: Record<string, File>;
}

const initialState: AuctionCreateItemImgs = {
  itemImgs: {},
};

export const auctionCreateItemImgSlice = createSlice({
  name: 'auctionCreateItemImg',
  initialState,
  reducers: {
    setItemImg: (state, action: PayloadAction<{ id: string; file: File }>) => {
      state.itemImgs[action.payload.id] = action.payload.file;
    },
  },
});

export const { setItemImg } = auctionCreateItemImgSlice.actions;

export default auctionCreateItemImgSlice.reducer;
