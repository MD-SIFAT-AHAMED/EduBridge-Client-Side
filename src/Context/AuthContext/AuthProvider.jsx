import React, { useEffect, useState } from "react";
import { AuthContex } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../Firebase/Firebase.init";
import useAxios from "../../Hooks/useAxios";

const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserData = (userData) => {
    return updateProfile(auth.currentUser, userData);
  };

  const loginWithGoggle = () => {
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser?.email) {
        const userData = { email: currentUser.email };
        axiosInstance
          .post("/jwt", userData)
          .then((res) => {
            const token = res.data.token;
            localStorage.setItem("token", token);
          })
          .catch(() => {
            
          });
      }
    });
    return () => unSubscribe();
  }, [axiosInstance]);

  const authInfo = {
    user,
    logOut,
    signIn,
    loading,
    loginWithGoggle,
    updateUserData,
    createUser,
  };
  return <AuthContex value={authInfo}>{children}</AuthContex>;
};

export default AuthProvider;
