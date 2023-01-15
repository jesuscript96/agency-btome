import { createSlice } from '@reduxjs/toolkit';

export const reviewSlice = createSlice(
    {
  name: 'review',
  initialState: {
    details: []
  },
  reducers: {
      addServiceToReview: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
  }
}
);


export const { addServiceToReview } = reviewSlice.actions;

export const reviewData = (state) => state.review;

export default reviewSlice.reducer;



