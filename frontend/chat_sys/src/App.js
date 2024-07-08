import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; // Corrected import
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import { Toaster } from 'react-hot-toast';
import { useAuthUser } from './Savedlogin/authLogin'; // Adjust import path as necessary

function App() {
  const { authUser } = useAuthUser(); // Destructure `authUser` from the context

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser ?<Home />: <Navigate to="/login" />  } />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
