import { createSlice } from "@reduxjs/toolkit";
import {setSelectedChat} from "@/store/chats/chatsActions";
import {ChatDTO} from "@/store/apiTypes";

type InitialStateType = {
    selectedChat: null | ChatDTO
}

const initialState: InitialStateType = {
    selectedChat: null
}

export const chat = createSlice({
    name: "chat",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(setSelectedChat,(state, action)=>{
            state.selectedChat = action.payload;
        })
    }
})