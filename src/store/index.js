import { configureStore } from '@reduxjs/toolkit';
import fleetReducer from './fleetSlice';
import authReducer from './authSlice';
import bookingReducer from './bookingSlice';

export const store = configureStore({
  reducer: {
    fleet: fleetReducer,
    auth: authReducer,
    booking: bookingReducer,
  },
});
