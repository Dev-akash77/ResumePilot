import {configureStore} from "@reduxjs/toolkit"
import { authSlices } from "../Slice/AuthSlice"

export const store = configureStore({
    reducer:{
        auth:authSlices
    }
})