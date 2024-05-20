import {ChatListItem} from '../chat-list-item/ChatListItem';
import {Box} from "@mui/material";
import {ChatDTO} from "@/store/apiTypes";
import {useDispatch} from "react-redux";
import {setSelectedChat} from "@/store/chats/chatsActions";


export const ChatsList = ({chats}: { chats: ChatDTO[] }) => {
    const dispatch = useDispatch();
    return (
        <Box
            sx={{
                my: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                overflowY: "auto",
                maxHeight: "75vh",
                scrollbarColor: "teal",
                "&::-webkit-scrollbar": {width: "3px"},
                "&::-webkit-scrollbar-thumb": {background: "teal.900"},
                "&::-webkit-scrollbar-track": {background: "teal.400"},
                pl: "10px"
            }}
        >
            {chats?.map((item) => {
                return (
                    <ChatListItem
                        key={item._id}
                        chatId={item._id}
                        chatName={item.chatname}
                        onClick={() => {
                            dispatch(setSelectedChat(item))
                        }}
                    />
                );
            })}
        </Box>
    );
};