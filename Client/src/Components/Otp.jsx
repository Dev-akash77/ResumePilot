import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { closeOtp, updateOtp, resetOtp } from "../Slice/AuthSlice";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verify_account } from "../Api/api";
import Button_Loader from "../UI/Button_Loader";

const Otp = () => {
  const inputRefs = useRef([]);

  const dispatch = useDispatch();

  //! Handle OTP input changes
  const handleChange = (e, index) => {
    const value = e.target.value;

    //! Update Redux OTP value by joining all inputs
    const otpValues = inputRefs.current.map((input) => input.value).join("");
    dispatch(updateOtp(otpValues));

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus(); //! Move to previous input on backspace
    }
  };

  //! Close dialog
  const handleCancel = () => {
    dispatch(closeOtp());
    dispatch(resetOtp());
    inputRefs.current.map((input) => (input.value = ""));
  };

  const QueryClient = useQueryClient();

  const verifyAccount = useMutation({
    mutationFn: verify_account,
    onSuccess: (data) => {
      if (data?.success) {
        dispatch(closeOtp());
        dispatch(resetOtp());
         QueryClient.invalidateQueries({ queryKey: ["profileData"] });
        inputRefs.current.map((input) => (input.value = ""));
        toast.success(data?.message);
      }
    },
  });

  //! Verify OTP (you can call API here)
  const handleVerify = () => {
    const otpValues = inputRefs.current.map((input) => input.value).join("");

    if (otpValues.length === 6) {
      verifyAccount.mutate(otpValues);
    } else {
      toast.error("Please enter complete OTP.");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-[rgba(0,0,0,.5)] flex items-center justify-center z-50">
        {/* OTP Box */}
        <div className="bg-white rounded-2xl shadow-lg w-[25rem] p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
          <p className="text-gray-600 mb-4">
            Please enter the 6-digit OTP sent to your email.
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-2 mb-6">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-10 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </button>
            
            <button
              className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-900 cursor-pointer"
              onClick={handleVerify}
            >
             {verifyAccount.isPending?<Button_Loader/>:"Verify Email"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
