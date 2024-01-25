import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@material-ui/core';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import {numberWithCommas} from "../CoinsTable";
import {AiFillDelete} from "react-icons/ai"
import { doc, setDoc } from 'firebase/firestore';



//we will use drawer component from material ui for side bar


const useStyles = makeStyles({
 container:{
  width:350,
  padding:25,
  height:"100%",
  display:"flex",
  flexDirection:'column',
  fontFamily:"monospace"
 },
 profile:{
  flex:1,
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  gap:"20px",
  height:"92%",
 },
 picture:{
  width:200,
  height:200,
  cursor:"pointer",
  backgroundColor:"#EEBC1D",
  objectFit:"contain",
 },
 logout:{
  marginTop:"auto",
  color:"#EEBC1D",
  border:"none",
  outline:"none",
  backgroundColor:"transparent",

 },
 watchlist:{
  flex:1,
  width:"100%",
  backgroundColor:"grey",
  borderRadius:10,
  padding:10,
  display:"flex",
  flexDirection:"column",
  gap:12,
  alignItems:"center",
  overflow:"scroll",
  marginBottom:"13%",

 },
 coin:{
  padding: 10,
  borderRadius: 5,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EEBC1D",
  boxShadow: "0 0 3px black",
 },
});



export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
   
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const {user,setAlert,watchlist,coins,symbol} =CryptoState();

    //to display user profile pic in side bar we need user from the context

    const logOut=()=>{
      signOut(auth);

      setAlert({
        open:true,
        type:"success",
        message:"Logged Out Successfully..!",
      });

      toggleDrawer();
    }

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };


  

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
        <Avatar
          onClick={toggleDrawer(anchor, true)}
          style={{
            height:38,
            width:38,
            marginLeft:15,
            cursor:"pointer",
            backgroundColor:"#EEBC1D",
          }}
          src={user.photoURL}
          alt={user.displayName || user.email}
          
           />
        
        {/* here we are taking image src as props and passing it to Avatar component 
        sx={{ cursor: "pointer", position:"fixed" , top :10,
          left :10 }} src= {user?.image ? user.image : require
          ("assets/img/no-profile-pic.jpg")}
          */}
          


         <Drawer
         anchor={anchor}
         open={state[anchor]}
         onClose={toggleDrawer(anchor,false)}
         
         >
         <div className={classes.container}>
         <div className={classes.profile}>
         <Avatar 
          className={classes.picture}
          src={user.photoURL}
          alt={user.displayName || user.email}
         />
         <span
         style={{
          width:"100%",
          fontSize:25,
          textAlign:"center",
          fontWeight:"bold",
          wordWrap:"break-word",
         }}>
          {user.displayName || user.email}
         </span>
         <div
         className={classes.watchlist}>
          <span
          style={{
            fontSize:15,
            textShadow:"0 0 5px black"
          }}>
            Watchlist
          </span>

          {coins.map((coin)=>{
            if(watchlist.includes(coin.id))
            return(
              <div className={classes.coin}>
                <span>
                  {coin.name}
                </span>
                <span 
                style={{
                  display: "flex", gap: 8 
                }}
                >
                {symbol}{" "}
                {numberWithCommas(coin.current_price.toFixed(2))}
                <AiFillDelete
                onClick={()=>removeFromWatchlist(coin)}
                style={{ cursor: "pointer" }}
                  fontSize="16"

                >

                </AiFillDelete>

                </span>
              </div>
            );
            

          })}

          


         </div>
         </div>
         <Button
         variant="outlined"
         className={classes.logout}
         onClick={logOut}
         style={{
          fontWeight:"bolder",
          fontSize:"15",
         }}
         >
          Log Out
         </Button>

         </div>
           
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
