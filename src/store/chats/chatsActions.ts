import {createAction} from "@reduxjs/toolkit";
import {ChatDTO} from "@/store/apiTypes";

export const setSelectedChat = createAction("chats/setSelectedChat", (chat: ChatDTO | null)=> ({payload: chat}))