import { createSlice } from '@reduxjs/toolkit';

export const serviceSlice = createSlice(
    {
  name: 'services',
  initialState: {
    details: []
  },
  reducers: {
    addService: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
  }
}
);


export const { addService } = serviceSlice.actions;

export const serviceData = (state) => state.services;

export default serviceSlice.reducer;



