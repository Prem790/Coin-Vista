import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CryptoState } from '../../CryptoContext';
import {createUserWithEmailAndPassword} from "firebase/auth";
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
  //WE WILL USE SNACKBAR COMPONENT FOR ALERT IF PASSWORD DOES NOT MATCH

  
const Signup = ({handleClose}) => {

    
    const classes=useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {setAlert}=CryptoState();

    const handleSubmit= async()=>{
      if(password!==confirmPassword){
        setAlert({
          open:true,
          message:"Passwords do not match",
          type:"error",
        });
        return;
      }
      //say we're gonna take create user with email and password from the firebase sdk
      try{
        const result= await createUserWithEmailAndPassword (auth,
          email,
          password);

          console.log(result);

          setAlert({
            open:true,
            message:`Sign up successful. Account created for ${result.user.email}`,
            type:"success",
          });
          handleClose();

      }catch(error){
        setAlert({
        open:true,
        message:"Passwords does not match.Please try again!",
        type:"error",
        });
        return;
      }

    };
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
        <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
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
        Sign Up
        </Button>
        
    </Box>
  )
}

export default Signup;