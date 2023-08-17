import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuctionUpdateItemImgs {
  itemImgs: Record<string, File>;
}

const initialState: AuctionUpdateItemImgs = {
  itemImgs: {},
};

export const auctionUpdateItemImgSlice = createSlice({
  name: 'auctionUpdateItemImg',
  initialState,
  reducers: {
    setItemImg: (state, action: PayloadAction<{ id: string; file: File }>) => {
      console.log(action.payload.id);
      state.itemImgs[action.payload.id] = action.payload.file;
    },
    resetItemImg: state => {
      state.itemImgs = initialState.itemImgs;
    },
  },
});

export const { setItemImg, resetItemImg } = auctionUpdateItemImgSlice.actions;

export default auctionUpdateItemImgSlice.reducer;
