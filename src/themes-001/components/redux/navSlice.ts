import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  result: null
};
export const navSlice = createSlice({
  name: 'navData',
  initialState: initialState,
  reducers: {
    LOTTO_DATA: (state, action) => {
      state.result = action.payload;
    },
    NAV_DATA: (state, action) => {
      state.result = action.payload;
    }
  }
});
export const { LOTTO_DATA, NAV_DATA } = navSlice.actions;
export default navSlice.reducer;
// action structure is {
//     "type": "subscribe/specificDecrement",
//     "payload": "aa"
// }
