import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [
    {
      id: 'RSV-8829',
      status: 'Confirmed', // Pending, Confirmed, Pickup Ready, Active, Completed
      startDate: '2024-05-24',
      endDate: '2024-05-28',
      vehicleId: 1,
      vehicleName: 'Tesla Model S Plaid',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400',
      pickupLocation: 'Beverly Hills Hub',
      returnLocation: 'Beverly Hills Hub',
      totalPrice: 1250,
      paymentStatus: 'Paid', // Pending, Paid, Refunded
      createdAt: '2024-05-14T10:00:00Z',
    },
    {
      id: 'RSV-7712',
      status: 'Completed',
      startDate: '2024-04-12',
      endDate: '2024-04-15',
      vehicleId: 4,
      vehicleName: 'Porsche Taycan Turbo S',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400',
      pickupLocation: 'Downtown Executive Hub',
      returnLocation: 'Downtown Executive Hub',
      totalPrice: 1800,
      paymentStatus: 'Paid',
      createdAt: '2024-04-10T15:30:00Z',
    }
  ],
  activeBooking: null,
  bookingFlow: {
    step: 1,
    data: {
      startDate: null,
      endDate: null,
      pickupLocation: '',
      returnLocation: '',
      vehicleId: null,
      driverInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      licenseImage: null,
      extras: {
        insurance: 'Basic',
        childSeat: false,
        premiumSupport: false,
      },
      paymentMethod: null,
    }
  }
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    startBooking: (state, action) => {
      state.bookingFlow.data.vehicleId = action.payload.vehicleId;
      state.bookingFlow.step = 1;
    },
    updateBookingData: (state, action) => {
      state.bookingFlow.data = { ...state.bookingFlow.data, ...action.payload };
    },
    nextStep: (state) => {
      state.bookingFlow.step += 1;
    },
    prevStep: (state) => {
      state.bookingFlow.step -= 1;
    },
    completeBooking: (state, action) => {
      const newBooking = {
        id: `RSV-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Pending',
        ...state.bookingFlow.data,
        createdAt: new Date().toISOString(),
      };
      state.bookings.unshift(newBooking);
      state.bookingFlow = initialState.bookingFlow;
    },
    cancelBooking: (state, action) => {
      const booking = state.bookings.find(b => b.id === action.payload);
      if (booking) booking.status = 'Cancelled';
    }
  },
});

export const { startBooking, updateBookingData, nextStep, prevStep, completeBooking, cancelBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
