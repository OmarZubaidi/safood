// Package imports
import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import firebase from 'firebase/compat';

// Local imports
import { auth } from '../firebase';
import { getUsers } from '../services/index';
import { IUser } from '../interfaces/User.interface';

const AuthContext = createContext<any>(null);

export function useAuth () {
  return useContext(AuthContext);
}

export function AuthProvider ({ children }: { children: any }) {
  // States
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);

  // Auth functions
  function signup (email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login (email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout () {
    return auth.signOut();
  }

  // Update profile function
  function updateProfile (user: firebase.User) {
    setCurrentUser(user);
  }

  async function fetchUsers () {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (error) {
      console.error(error);
    }
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
      {!loading && <>{children}</>}
    </AuthContext.Provider>
  );
}