import React from 'react'
import  { Route, Navigate , Outlet} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import MainPage from './MainPage';

export default function PrivateRoute() {
  const { currentUser } = useAuth();



  return (
    currentUser ? <Navigate to="/main" replace/>  : <Navigate to="/login" replace></Navigate>
  )
}
