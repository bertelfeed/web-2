import { Box } from '@mui/material';

export const ChatListItem = ({
                                 chatName,
                                 onClick
                             }: {
    chatId: string;
    chatName: string;
    onClick: () => void;
}) => {

    return (
        <Box sx={{
            mr: "10px"
        }}>
            <Box
                sx={{
                    width: "100%",
                    height: "auto",
                    border: "solid 1px teal",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    px: "10px",
                    cursor: "pointer"
                }}
                onClick={onClick}
            >
                <Box
                    sx={{
                        width: "70%",
                        display: "flex",
                        flexWrap: "no-wrap"
                    }}>
                    {chatName}
                </Box>
            </Box>
        </Box>
    );
};