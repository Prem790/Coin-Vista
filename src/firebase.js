import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
import firebaseConfig from "./config/firebaseConfig";

// this is the variable that is gonna act as an entry point between our project and firebase so were gonna use this variable to initialize our auth and our database 
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db=getFirestore(firebaseApp);

// are done with initial configuration of firebase with react 

export {auth,db};