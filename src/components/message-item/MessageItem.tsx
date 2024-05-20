import {Box} from "@mui/material";
import {useGetUserChatsQuery} from "@/store/chatsApi";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export const MessageItem = ({message} : {message: {
        author: string,
        text: string,
        date: string
    }}) => {
    const userId = useSelector((state: RootState) => state.auth.userId);

    return (
        <Box sx={{mx: "30px"}}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: message.author === userId ? "flex-end" : "flex-start",
                    px: "30px",
                    py: "5px",
                }}
            >
                <Box
                    sx={{
                        width: "45%",
                        border: "1px solid teal",
                        borderRadius:
                            message.author === userId
                                ? "8px 8px 0px 8px"
                                : "8px 8px 8px 0px",
                        p: "5px",
                        backgroundColor:
                            message.author === userId ? "teal.200" : "teal.100",
                    }}
                >
                    <Box sx={{fontSize: "18px"}}>{message.text}</Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            fontSize: "10px",
                        }}
                    >
                        <Box sx={{float: "left"}}>{message.date}</Box>
                    </Box>
                </Box>
                <Box>{message.author === userId ? "you" : userId}</Box>
            </Box>
        </Box>
    );
};