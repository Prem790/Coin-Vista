import React from 'react';
import { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CryptoState } from '../../CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';


const useStyles = makeStyles({
    outlinedInput: {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
      },
    },
  });


const Login = ({handleClose}) => {
    const classes=useStyles();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const {setAlert} = CryptoState();



const handleSubmit=async()=>{
  if(!email || !password){
  setAlert({
    open:true,
    message:"Please fill out all fields",
    type:"error"
  })
  return;
}
try {
  const result=await signInWithEmailAndPassword(auth,email,password);

  console.log(result);

  setAlert({
    open:true,
    message:`Log in successful. Welcome back ${result.user.email}`,
    type:"success",
  })

  
} catch (error) {
  setAlert({
    open:true,
    message:"Wrong Password.Please Log in with correct password!",
    //we can also use error.message in that case it will show firebase generated message
    type:"error",
  })
  
}
}

  return (
    <Box p={3}
    style={{
        display:"flex",
        flexDirection:"column",
        gap:"20px",
    }}>
        <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        fullWidth 
        InputLabelProps={{style:{color:"black"}}}
        inputProps={{ style: { color: 'black' } }}
        className={classes.outlinedInput}
        />
        <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        fullWidth 
        InputLabelProps={{style:{color:"black"}}}
        inputProps={{ style: { color: 'black' } }}
        className={classes.outlinedInput}
        />
       
        <Button 
        onClick={handleSubmit}
        variant="contained"
        size="large"
        style={{
            backgroundColor:"black",
            color:"white",
            fontWeight:"bold"
        }}
        >
        Log In
        </Button>
        
    </Box>
  )
}

export default Login