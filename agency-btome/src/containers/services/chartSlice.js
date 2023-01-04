import { createSlice } from '@reduxjs/toolkit';

export const chartSlice = createSlice(
  {
    name: 'chart',
    initialState: {
      details: [],
      name: [],
      price: []
    },
    reducers: {
      addServiceToChart: (state, action) => {
        return {
          ...state,
          details: [...state.details, action.payload],
          name: [...state.name, action.payload],
          price: [...state.price, action.payload]
        }
      }
    }
  }
);

export const { addServiceToChart } = chartSlice.actions;

export const chartData = (state) => state.chart;

export default chartSlice.reducer;



