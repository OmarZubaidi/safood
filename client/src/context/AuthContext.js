// Package imports
import { createContext, useContext, useState, useEffect } from 'react';

// Local imports
import { auth } from '../firebase';
import { getUsers } from '../services';

const AuthContext = createContext();

export function useAuth () {
  return useContext(AuthContext);
}

export function AuthProvider ({ children }) {
  // States
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();

  // Auth functions
  function signup (email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login (email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout () {
    return auth.signOut();
  }

  // Update profile function
  function updateProfile (user) {
    setCurrentUser(user);
  }

  async function fetchUsers () {
    const res = await getUsers();
    setUsers(res);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      fetchUsers();
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    updateProfile,
    logout,
    users
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
