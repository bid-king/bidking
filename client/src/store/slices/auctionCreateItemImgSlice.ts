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
    resetItemImg: state => {
      state.itemImgs = initialState.itemImgs;
    },
  },
});

export const { setItemImg, resetItemImg } = auctionCreateItemImgSlice.actions;

export default auctionCreateItemImgSlice.reducer;
