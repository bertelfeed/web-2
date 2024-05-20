import {createAction} from "@reduxjs/toolkit";

export const setUserId = createAction("auth/setUserId", ({userId})=>({payload: userId}))