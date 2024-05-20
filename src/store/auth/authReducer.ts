import {createSlice} from "@reduxjs/toolkit";
import {setUserId} from "@/store/auth/authActions";

export const auth = createSlice({
    name: "auth",
    initialState: {
        userId: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setUserId, (state, action)=>{
            state.userId = action.payload;
        })
    }
})