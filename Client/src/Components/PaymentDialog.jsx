import React, { useState } from "react";
import Button_Loader from "../UI/Button_Loader";
import {
  LuX,
  LuCreditCard,
  LuShieldCheck,
  LuLock,
  LuCheck,
} from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { closePaymentDialogBox } from "../Slice/PaymentSlice";
import { paymentData, verifyPaymentData } from "../Api/paymentApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

// Props update kiye hain taaki plan details show kar sakein
const PaymentDialog = () => {
  const payment = useSelector((state) => state.payment);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { credits, amount, plan } = payment;
   const queryClient = useQueryClient();


  const initpay = (data) => {
    const options = {
      key: import.meta.env.VITE_RAZOR_PAY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Resume Pilot",
      description: "Resumepilot Payment",
      order_id: data.id,
      handler: async function (response) {
        const verifyData = await verifyPaymentData({
          razorpay_order_id: response.razorpay_order_id,
          cradit: credits,
        });
        if (verifyData?.success) {
          toast.success(verifyData.message);
         queryClient.invalidateQueries({ queryKey: ["profileData"] });
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const data = await paymentData({ amount: amount });
         
      if (data?.success) {
        initpay(data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      dispatch(closePaymentDialogBox());
    } finally {
      dispatch(closePaymentDialogBox());
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0"></div>

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100 mx-4">
        {/* Header - Security Badge ke saath */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <LuCreditCard className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 leading-tight">
                Confirm Payment
              </h2>
              <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <LuLock className="text-xs" /> 256-bit SSL Secure
              </p>
            </div>
          </div>
          <button
            className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            onClick={() => {
              dispatch(closePaymentDialogBox());
            }}
          >
            <LuX className="text-xl" />
          </button>
        </div>

        {/* Content - Order Summary */}
        <div className="p-6">
          {/* Order Details Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Order Summary
            </h3>

            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600 font-medium">{plan}</span>
              <span className="text-slate-900 font-bold">₹{amount}</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-500 text-sm">Credits Added</span>
              <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-0.5 rounded-md">
                +{credits} Credits
              </span>
            </div>

            {/* Dashed Line */}
            <div className="border-t border-dashed border-slate-300 my-3"></div>

            <div className="flex justify-between items-center">
              <span className="text-slate-800 font-bold text-lg">Total</span>
              <span className="text-blue-600 font-extrabold text-2xl">
                ₹{amount}
              </span>
            </div>
          </div>

          {/* Benefits / Trust Badges */}
          <div className="flex items-center justify-center gap-4 mb-6 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <LuShieldCheck className="text-green-500 text-lg" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <LuCheck className="text-blue-500 text-lg" />
              <span>Instant Access</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handlePayment}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-blue hover:bg-blue-800 text-white rounded-xl font-bold shadow-lg shadow-slate-900/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <Button_Loader text={"Processing..."} />
            ) : (
              <div className="flex items-center gap-2 cursor-pointer">
                Pay ₹{amount}
              </div>
            )}
          </button>

          <p className="text-center text-xs text-slate-400 mt-4">
            By continuing, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDialog;
