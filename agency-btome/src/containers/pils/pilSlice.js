import { createSlice } from '@reduxjs/toolkit';

export const pilSlice = createSlice(
    {
  name: 'pils',
  initialState: {
    details: []
  },
  reducers: {
    addPil: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
  }
}
);


export const { addPil } = pilSlice.actions;

export const pilData = (state) => state.pils;

export default pilSlice.reducer;



