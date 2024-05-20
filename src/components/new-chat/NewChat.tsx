import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState, useEffect} from "react";
import {useCreateChatMutation} from "@/store/chatsApi";
import {RootState} from "@/store/store";
import {useSelector} from "react-redux";

export default function NewChat() {
    const [chatname, setChatname] = useState("");
    const [isChatnameError, setIsChatnameError] = useState("");

    const [open, setOpen] = useState(false);

    const [createChat, createChatResult] = useCreateChatMutation();

    const userId = useSelector((state: RootState) => state.auth.userId);

    useEffect(()=>{
        if (createChatResult.isSuccess) {
            setOpen(false)
        }
    }, [createChatResult])

    return <>
        <Box sx={{
            display: "flex",
            width: "12vw",
            justifyContent: "flex-end",
            alignItems: "flex-end"
        }}>
            <Button variant={"contained"} onClick={()=> { setOpen(true) }}>ADD NEW CHAT</Button>
        </Box>
        <Dialog open={open}
                onClose={() => setOpen(false)}
                aria-labelledby={"dialog-title"}
                aria-describedby={"dialog-content"}
                fullWidth>
            <DialogTitle id={"dialog-title"}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    Create new chat
                </Box>
            </DialogTitle>
            <DialogContent id={"dialog-content"}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1vh"
                }}>
                    <TextField label={"Chat name"}
                               value={chatname}
                               onChange={(ev)=>setChatname(ev.target.value)}
                               error={!!isChatnameError}
                               onBlur={()=>{if (chatname === "") {
                                   setIsChatnameError("Invalid chatname");
                               }}}
                               onFocus={()=>{setIsChatnameError("")}}
                               helperText={isChatnameError}
                               fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Box sx={{
                    display: "flex",
                    width: "100vw",
                    justifyContent: "center"
                }}>
                    <Box sx={{
                        display: "flex",
                        marginRight: "1vw"
                    }}>
                        <Button variant={"outlined"} onClick={() => {
                            createChat({chatname: chatname, participants: [userId], owner: userId});
                        }}>Confirm</Button>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        marginLeft: "1vw"
                    }}>
                        <Button variant={"contained"} onClick={() => {
                            setOpen(false);
                        }}>Cancel</Button>
                    </Box>
                </Box>
            </DialogActions>
        </Dialog>
    </>
}