import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {useSignupMutation} from "@/store/authApi";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [isUsernameError, setIsUsernameError] = useState("");

    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState("");

    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [isRepeatedPasswordError, setIsRepeatedPasswordError] = useState("");

    const [signup] = useSignupMutation();

    return <Box component="form" sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center"
    }}>
        <TextField sx={{marginBottom: "5vh"}}
                   value={username}
                   onChange={(ev)=>setUsername(ev.target.value)}
                   label={"Enter username"}
                   error={!!isUsernameError}
                   onBlur={()=>{if (username.length < 3) {
                       setIsUsernameError("Username should contain at least 3 characters");
                   }}}
                   onFocus={()=>{setIsUsernameError("")}}
                   helperText={isUsernameError}
        />
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
                   error={!!isPasswordError}
                   onBlur={()=>{
                       if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/)) {
                           setIsPasswordError("Password should contain at least 8 characters, one lowercase letter, one uppercase letter, one numeric digit, and one special character");
                       }
                   }}
                   onFocus={()=>{setIsPasswordError("")}}
                   helperText={isPasswordError}
        />
        <TextField sx={{marginBottom: "5vh"}}
                   value={repeatedPassword}
                   onChange={(ev)=>setRepeatedPassword(ev.target.value)}
                   label={"Repeat password"}
                   error={!!isRepeatedPasswordError}
                   onBlur={()=>{
                       if (repeatedPassword != password) {
                           setIsRepeatedPasswordError("Passwords don't match");
                       }
                   }}
                   onFocus={()=>{setIsRepeatedPasswordError("")}}
                   helperText={isRepeatedPasswordError}
        />
        <Button variant={"contained"} onClick={()=> {
            if (!isUsernameError && !isEmailError && !isPasswordError && !isRepeatedPasswordError) {
                console.log({username, email, password});
                signup({username, email, password});
            }
        }}>Sign up</Button>
    </Box>
}