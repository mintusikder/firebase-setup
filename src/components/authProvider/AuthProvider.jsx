import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  //user register
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //user login
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //google login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // facebook
  const facebook = () => {
    return signInWithPopup(auth, facebookProvider);
  };
  // signOut 
  const logOut = () =>{
   return signOut(auth)
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      return;
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authUser = {
    registerUser,
    loginUser,
    user,
    googleLogin,
    setUser,
    facebook,
    logOut
  };

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
