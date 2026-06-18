import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicles: [
    { id: 1, name: 'Tesla Model S', type: 'Electric', status: 'Available', price: 120, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'BMW M4', type: 'Sport', status: 'Rented', price: 150, image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Mercedes-Benz G-Class', type: 'SUV', status: 'In Service', price: 200, image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Porsche 911', type: 'Sport', status: 'Available', price: 180, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400' },
    { id: 5, name: 'Audi e-tron', type: 'Electric', status: 'Available', price: 110, image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=400' },
    { id: 6, name: 'Range Rover Sport', type: 'SUV', status: 'Rented', price: 140, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400' },
  ],
  stats: {
    totalRevenue: 45200,
    activeBookings: 12,
    fleetUtilization: 85,
    pendingMaintenance: 3,
  }
};

const fleetSlice = createSlice({
  name: 'fleet',
  initialState,
  reducers: {
    updateVehicleStatus: (state, action) => {
      const { id, status } = action.payload;
      const vehicle = state.vehicles.find(v => v.id === id);
      if (vehicle) vehicle.status = status;
    },
    addVehicle: (state, action) => {
      state.vehicles.unshift(action.payload);
    },
  },
});

export const { updateVehicleStatus, addVehicle } = fleetSlice.actions;
export default fleetSlice.reducer;
