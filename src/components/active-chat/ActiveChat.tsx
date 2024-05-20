import {Box, TextField, Button} from "@mui/material";
import {MessageItem} from "@/components/message-item/MessageItem";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {socket} from "@/pages/chats";
import {useState} from "react";

export default function ActiveChat() {
    const [newMessage, setNewMessage] = useState("");

    const selectedChat = useSelector((state: RootState) => state.chat.selectedChat);

    const userId = useSelector((state: RootState) => state.auth.userId);

    return <Box sx={{
        display: "flex",
        flexDirection: "column"
    }}>
        {selectedChat ? (
            <>
                <Box sx={{
                    display: "flex",
                    height: "5vh",
                    width: "62vw",
                    justifyContent: "center",
                    fontSize: 30
                }}>
                    Chat name: {selectedChat.chatname}
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "10vh",
                    width: "51vw",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    fontSize: 20
                }}>
                    Participants:
                    <Box
                        sx={{
                            border: 1,
                            borderColor: "primary.main",
                            borderRadius: "16px",
                            px: "100px",
                            marginLeft: "1vh",
                            marginRight: "1vh"
                        }}
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            overflowY: "auto",
                            maxHeight: "30px",
                            "&::-webkit-scrollbar": {width: "0px"}
                        }}
                        >
                            {selectedChat?.participants.map((user) => (
                                <Box key={user}>
                                    {user}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Box sx={{
                            display: "flex",
                            marginBottom: "1vh"
                        }}>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "73vh",
                    overflowY: "auto",
                    scrollbarColor: "teal",
                    "&::-webkit-scrollbar": {width: "0px"},
                    marginTop: "1vh"
                }}>
                    {selectedChat?.messages.map((message) => (
                        <MessageItem message={message}/>
                    ))}
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "46vw",
                    alignItems: "flex-end",
                    justifyContent: "flex-end"
                }}>
                    <TextField label={"Enter your message"}
                               variant={"standard"}
                               sx={{width: "20vw"}}
                               value={newMessage}
                               onChange={(ev)=>setNewMessage(ev.target.value)}
                    />
                    <Button variant={"contained"}
                            onClick={() => {
                                socket.emit("new_message", {newMessage, id: selectedChat._id, author: userId})
                            }}
                    >
                        SEND MESSAGE
                    </Button>
                </Box>
            </>
        ) : (
            <Box sx={{
                display: "flex",
                height: "5vh",
                width: "62vw",
                justifyContent: "center",
                fontSize: 30
            }}>Select a chat in the left side</Box>
        )}
    </Box>
}