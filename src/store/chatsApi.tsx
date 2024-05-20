import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {ChatDTO, GeneralResponse, MessageDTO} from "@/store/apiTypes";

export const chatsApi = createApi({
    reducerPath: 'chatsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/chats/' }),
    tagTypes: ["Chats"],
    endpoints: (builder) => ({
        getUserChats: builder.query<GeneralResponse<ChatDTO[]>,
            {
                userId: string
            }>({
            query: ({userId}) => ({
                url: `/${userId}`
            }),
            providesTags: ["Chats"]
        }),
        createChat: builder.mutation<GeneralResponse,
            {
                chatname: string;
                participants: string[];
                owner: string;
            }>({
            query: ({chatname, participants, owner}) => ({
                url: `/`,
                method: "POST",
                body: {
                    chatname, participants, owner
                }
            }),
            invalidatesTags: ["Chats"]
        }),
        deleteChat: builder.mutation<GeneralResponse,
            {
                id: string;
                owner: string;
            }>({
            query: ({id, owner}) => ({
                url: `/${id}`,
                method: "DELETE",
                body: {owner}
            }),
            invalidatesTags: ["Chats"]
        }),
        updateChat: builder.mutation<GeneralResponse,
            {
                id: string;
                user: string;
                chatname: string;
                participants: string[];
                owner: string;
            }>({
            query: ({id, user, chatname, participants, owner}) => ({
                url: `/${id}`,
                method: "PUT",
                body: {
                    user, chatname, participants, owner
                }
            }),
            invalidatesTags: ["Chats"]
        }),
    }),
})

export const { useGetUserChatsQuery, useCreateChatMutation, useDeleteChatMutation, useUpdateChatMutation } = chatsApi;