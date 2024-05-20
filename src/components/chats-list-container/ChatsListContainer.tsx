import {Box, TextField} from "@mui/material";
import {ChatsList} from "@/components/chats-list/ChatsList";
import NewChat from "@/components/new-chat/NewChat";
import {useGetUserChatsQuery} from "@/store/chatsApi";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useEffect, useState} from "react";
import {ChatDTO} from "@/store/apiTypes";

export default function ChatsListContainer() {
    const [search, setSearch] = useState("");

    const userId = useSelector((state: RootState) => state.auth.userId);

    const {data} = useGetUserChatsQuery({userId});

    const listOfChats = data?.payload;

    const [filteredChats, setFilteredChats] = useState(listOfChats);

    useEffect(() => {
        if (search) {
            setFilteredChats(
                listOfChats?.filter((item) =>
                    item.chatname.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFilteredChats(listOfChats);
        }
    }, [search, listOfChats]);

    return <>
        <Box sx={{
            display: "flex",
            flexDirection: "column"
        }}>
            <Box sx={{
                display: "flex",
                height: "10vh",
                width: "16vw",
                justifyContent: "center",
                alignItems: "flex-end"
            }}>
                <TextField label={"Search chat by name"}
                           variant={"standard"}
                           value={search}
                           onChange={(ev)=>setSearch(ev.target.value)}
                />
            </Box>
            <ChatsList chats={filteredChats as ChatDTO[]} />
            <NewChat />
        </Box>
    </>
}