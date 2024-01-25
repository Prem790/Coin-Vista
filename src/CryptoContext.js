import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open:false,
    message:"",
    type:"success",

  });
  const [watchlist, setWatchlist] = useState([]);

// onAuthStateChanged - auth state change so it's going to monitor the state of our authentication of our firebase app so it takes the auth which was provided by this file firebase.js okay it takes this auth and then it's gonna give us a callback so user and this will contain the detail of the user if the user is login or not so if user is there then we're gonna set the user simply set user to user else oops else we're gonna set user set user to null


//we will use onSnapshot from firebase so that for the watchlist
//if any user adds or removes a coin it gets updated in all tabs.
useEffect(() => {
  if(user){
    const coinRef=doc(db,"watchlist",user?.uid);

    var unsubscribe = onSnapshot(coinRef,(coin)=>{
      if(coin.exists()){
        console.log(coin.data().coins);
        setWatchlist(coin.data().coins);
      }
      else{
        console.log("No items in watchlist");
      }
    });

  

  return () => {
    unsubscribe();
  }
}
}, [user]);



useEffect(() => {
  onAuthStateChanged(auth,(user)=>{
    if(user) setUser(user);
    else setUser(null);
  })

  console.log(user);

  
}, [])


  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };


  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol , coins,loading,fetchCoins,alert,setAlert,user,watchlist}}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
