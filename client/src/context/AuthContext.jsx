import React, { useContext, useState, useEffect } from 'react'
import {auth} from '../firebase'
import { getUser } from '../components/service'

const AuthContext = React.createContext()


export function useAuth(){
  return useContext(AuthContext)
}
export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState();

  function signup(email, password){
    return auth.createUserWithEmailAndPassword(email,password)
  }

  function login(email, password){
    return auth.signInWithEmailAndPassword(email,password)
  }

  function logout(){
    return auth.signOut();
  }

  function updateProfile(user){
    setProfile(user);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      setCurrentUser(user)
      getUser(user)
      .then(response => response.json())
      .then(data => {setProfile(data)
      });
      setLoading(false)
    });
    return unsubscribe
  },[])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateProfile,
    profile
  }
  return (
   <AuthContext.Provider value={value}>
     {!loading && children}
   </AuthContext.Provider> 
  )
}
