
import { configureStore } from '@reduxjs/toolkit';
import serviceSlice from '../containers/services/serviceSlice';
import chartSlice from '../containers/services/chartSlice';
export default configureStore({
    reducer: {
        // user: userSlice,
        services: serviceSlice,
        chart: chartSlice
    }
    
});