import React, { useContext, useState, useEffect } from 'react'
import { useAuth} from './AuthContext'
import { getUser, updateUserAllergens } from '../components/service';


const ProfileContext = React.createContext()


export function useProfile(){
  return useContext(ProfileContext)
}

export function ProfileProvider({children}){
  const [profile, setProfile] = useState();
  const {currentUser} = useAuth();


  async function fetchUser () {
    try {
      getUser(currentUser)
      .then(response => response.json())
      .then(data => {setProfile(data)
      });
    } catch (error) {
      console.log(error)
    }

  }

  function updateProfile(user){
    setProfile(user);
  }

  const value = {
    fetchUser,
    profile,
    updateProfile
  }

  useEffect(() => {
    fetchUser();
  },[])

  return (
   <ProfileContext.Provider value={value}>
     {children}
   </ProfileContext.Provider> 
  )
}