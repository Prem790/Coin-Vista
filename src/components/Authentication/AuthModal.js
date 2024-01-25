import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Box, Button, Tab, Tabs } from '@material-ui/core';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import  { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:400,
    backgroundColor:"gold",
    color:"white",
    borderRadius:10,
  },
  google:{
    padding:25,
    paddingTop:0,
    display:"flex",
    flexDirection:"column",
    textAlign:"center",
    gap:20,
    fontSize:20,
  }
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { setAlert} = CryptoState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange=(event , newValue)=>{
    setValue(newValue);
  };

  console.log(value);
  //loin-0
  //signup-1

  //we will use googleauthProvider from firebase for google authentication

  const googleProvider = new GoogleAuthProvider()

  const signInWithGoogle=()=>{
    signInWithPopup(auth,googleProvider).then((res)=>{
      setAlert({
        open: true,
        message : `Sign up Successful! Welcome ${res.user.email}`,
        type:'success',
      });
      handleClose();
    })
    .catch((error)=>{
      setAlert({
        open:true,
        message:error.message,
        type:"error",
      });
      return;
    })
  }
  return (
    <div>
      
      <Button variant="contained"
      style={{
        width:85,
        height:40,
        marginLeft:15,
        backgroundColor:"#EEBC1D",
        fontWeight:"bold",
      }}
      onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <AppBar
          position="static"
          style={{
            backgroundColor:"transparent",
            color:"white,"
          }}>
            <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            style={{borderRadius:10}}>
                <Tab label="Login" 
                    style={{fontWeight:"bold"}}
                />
                <Tab label="Sign Up" 
                    style={{
                        fontWeight:"bold"
                    }}
                />
            </Tabs>
          </AppBar>
          

          {value==0 && <Login handleClose={handleClose} />}
          {value == 1 && <Signup handleClose={handleClose} />}

          <Box className={classes.google}>
            <span style={{
              color:"black",
              fontWeight:500,
            }}>
              OR
            </span>
            <GoogleButton
              style={{
                width:"100%",
                outline:"none"
              }}
              onClick={signInWithGoogle}
            />
          </Box>


          
           </div>
        </Fade>
      </Modal>
    </div>
    //we will add google authentication now
    //for sign in with google instead of creating our own button we will use reacr in built library named react-google-button for it
  );
}
// regarding firestore database
/*for any end point user can read or write
if
it's true or false we can add true
so yep it's going to be true user can
read and write if we add false over here
user cannot read or write to any of the
end point so this might be a little bit
confusing let me
explain it properly
so if i remove this
and now inside of this it says inside of
our documents we're gonna add a api
endpoint so
our api endpoint is gonna be called
watchlist so i'm gonna say match slash
watchlist
slash user id
we're gonna store all of the coins
related to a particular user in inside
of their user id
okay
so now inside of this we're gonna add
the check allow
read only when
so allow read if
what happens if
request
dot
auth
dot uid don't worry i'm going to explain
this in a minute
equals to user id so what does this
means so this request is the object that
we send from our front end or to we send
to the back and when we try to access
the file store so what are all the
things that are inside of this request
so let's go ahead and search on the
google so request
in firestore
let's see what it what do we get
so inside this request object we have
this auth which contains our uid or uuid
of the requesting user
the token and what else do it does it
contains it contains the method if it
gets or list or create update delete
and it contains bunch of other things
like query resource but what we need is
we need this thing
we need request dot auth we need we're
gonna match it if the current user who
is trying to access the data matches the
field in our database only then we're
gonna allow him to write it or read it
so currently i'm just i've just added
read so i'm just gonna add write as well
so here i'm gonna add write
you can also write like this read comma
right
doesn't really matter so now we can test
it out over here so if we click on this
rules playground if we click on this we
can test it so currently it's get that
means we're going to read the data right
so let's take this
and paste it over here so if we run this
you're gonna see nope it's not gonna
allow us to read the data
but if we say the user is authenticated
and run this
again it's not gonna allow us because we
haven't provided this uid */