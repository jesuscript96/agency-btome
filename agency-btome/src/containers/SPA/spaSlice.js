import { createSlice } from '@reduxjs/toolkit';

export const spaSlice = createSlice(
    {
  name: 'spa',
  initialState: {
    details: ""
  },
  reducers: {
    addSpa: (state, action) => {
        return {
          // ...state,
          // ...action.payload
          details: action.payload.details
        }
        
      }
  }
}
);


export const { addSpa } = spaSlice.actions;

export const spaData = (state) => state.spa;

export default spaSlice.reducer;



