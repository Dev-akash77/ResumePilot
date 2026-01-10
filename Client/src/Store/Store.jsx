import {configureStore} from "@reduxjs/toolkit"
import { authSlices } from "../Slice/AuthSlice"
import { resumeSlices } from "../Slice/ResumeSlice"
import { paymentSlices } from "../Slice/PaymentSlice"

export const store = configureStore({
    reducer:{
        auth:authSlices,
        resume:resumeSlices,
        payment:paymentSlices
    }
}) 