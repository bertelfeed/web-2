import {Box, Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useSigninMutation} from "@/store/authApi";
import {useDispatch} from "react-redux";
import {setUserId} from "@/store/auth/authActions";
import {useRouter} from "next/router";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState("");

    const [password, setPassword] = useState("");

    const [signin, signinResult] = useSigninMutation();

    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(()=>{
        if (signinResult.isSuccess) {
            dispatch(setUserId({userId: signinResult.data.payload?.userId}))
            router.push("/chats")
        }
    }, [signinResult])

    return <Box component="form" sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center"
    }}>
        <TextField sx={{marginBottom: "5vh"}}
                   value={email}
                   onChange={(ev)=>setEmail(ev.target.value)}
                   label={"Enter email"}
                   error={!!isEmailError}
                   onBlur={()=>{if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                       setIsEmailError("Invalid email");
                   }}}
                   onFocus={()=>{setIsEmailError("")}}
                   helperText={isEmailError}
        />
        <TextField sx={{marginBottom: "5vh"}}
                   value={password}
                   onChange={(ev)=>setPassword(ev.target.value)}
                   label={"Enter password"}
        />
        <Button variant={"outlined"} onClick={()=> {
            if (!isEmailError) {
                console.log({email, password});
                signin({email, password});
            }
        }}>Sign in</Button>
    </Box>
}