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
  const [loading, setLoading] = useState(true)
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  //user register
  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //user login
  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  //google login
  const googleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };
  // facebook
  const facebook = () => {
    setLoading(true)
    return signInWithPopup(auth, facebookProvider);
  };
  // signOut 
  const logOut = () =>{
   return signOut(auth)
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false)
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
    logOut,
    loading
  };

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
