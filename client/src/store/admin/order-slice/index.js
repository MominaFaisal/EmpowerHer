import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllOrdersForAdmin = createAsyncThunk(
  'adminOrder/getAllOrdersForAdmin',
  async () => {
    const response = await axios.get('http://localhost:5000/api/admin/orders/getAll');
    return response.data.orders;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  'adminOrder/getOrderDetailsForAdmin',
  async (orderId) => {
    const response = await axios.get(`http://localhost:5000/api/admin/orders/${orderId}`);
    return response.data.order;
  }
);

const orderSlice = createSlice({
  name: 'adminOrder',
  initialState: {
    orderList: [],
    orderDetails: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetOrderDetails(state) {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderList = action.payload;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
      });
  },
});

export const { resetOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
