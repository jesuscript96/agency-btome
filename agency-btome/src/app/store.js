
import { configureStore } from '@reduxjs/toolkit';
import serviceSlice from '../containers/services/serviceSlice';
import chartSlice from '../containers/services/chartSlice';
import pilSlice from '../containers/pils/pilSlice';
import userSlice from '../components/user/userSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        services: serviceSlice,
        chart: chartSlice,
        pils: pilSlice
    }
    
});