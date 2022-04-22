import React from "react"
import Signup from './Authentication/Signup'
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap"
import { AuthProvider } from '../context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Profile from './Profile'
import Login from  './Authentication/Login'
import PrivateRoute from './PrivateRoute'
import MainPage from './MainPage'
import { ProfileProvider } from '../context/ProfileContext'

function App() {

    
    return (
        

        <Container 
        className='d-flex align-items-center justify-content-center ' 
        style={{minHeight: "100vh"}}>
            <div className='w-100' style={{minWidth: "400px"}}>
                <Router>
                <AuthProvider>
                    <Routes>
                        <Route exact path="/" element={<PrivateRoute/>}></Route>
                        <Route path="/main" element={<MainPage/>} />
                        <Route path="/signup" element={<Signup/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/profile" element={<Profile/>} />

                    </Routes>
                </AuthProvider>
                </Router>
            </div>
        </Container>
        
    )
}

export default App