import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDialog: false,
  amount: 0,
  credits: 0,
  plan: "pro",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // ?----------------------------------------------------------------------------------------------
    // * OPEN PAYMENT CONFORMATION DIALOG BOX
    openPaymentDialogBox: (state) => {
      state.showDialog = true;
    },
    // ?----------------------------------------------------------------------------------------------
    // !----------------------------------------------------------------------------------------------
    // ?----------------------------------------------------------------------------------------------
    // * CLOSE PAYMENT CONFORMATION DIALOG BOX
    closePaymentDialogBox: (state) => {
      state.showDialog = false;
      state.amount = 0;
      state.credits = 0;
      state.plan = "pro";
    },
    // ?----------------------------------------------------------------------------------------------
    // !----------------------------------------------------------------------------------------------
    // ?----------------------------------------------------------------------------------------------
    // * CLOSE PAYMENT Selection
    paymentSelection: (state, action) => {
      state.showDialog = true;
      const selected_plan = action.payload;
      state.plan = selected_plan.id;
      state.amount = selected_plan.price;
      state.credits = selected_plan.credits;
    },
    // ?----------------------------------------------------------------------------------------------
  },
});

export const { openPaymentDialogBox, closePaymentDialogBox, paymentSelection } =
  paymentSlice.actions;
export const paymentSlices = paymentSlice.reducer;
