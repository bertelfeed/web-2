import {Box} from "@mui/material";
import ActiveChat from "@/components/active-chat/ActiveChat";
import ChatsListContainer from "@/components/chats-list-container/ChatsListContainer";
import { io } from "socket.io-client";
import {useEffect} from "react";

export const socket = io("localhost:8080");

export default function Chats() {
    socket.on("chat_updated", (payload)=> {
        console.log("Chat updated", payload)
    })

    useEffect(()=>{
        socket.connect();
        return ()=>{socket.disconnect();}
    }, [])

    return <Box sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5vh"
    }}>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            width: "75vw",
            height: "100vh",
            border: 3,
            borderColor: "primary.main",
            borderRadius: "16px"
        }}>
            <ChatsListContainer />
            <ActiveChat />
        </Box>
    </Box>
}