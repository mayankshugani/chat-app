import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import Login from './pages/Login/Login'
import Chat from './pages/chat/Chat'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { AppContext } from './context/AppContext'
// import 'react-toastify/dist/ReactTostify.css';

const App = () => {

  const navigate = useNavigate()
  const{loadUserData} = useContext(AppContext)

  useEffect(()=>{
      onAuthStateChanged(auth , async (user)=>{
        if(user){
          navigate('/chat')
          await loadUserData(user.uid)
        }
        else{
          navigate('/')
        }
      })
  },[])

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element = {<Login/>}></Route>
      <Route path ='/chat' element = {<Chat/>}></Route>
      <Route path='/profile' element= {<ProfileUpdate/>}></Route>
    </Routes>
    </>
  )
}

export default App
