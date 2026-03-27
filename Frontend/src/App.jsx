import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import Authentication from './pages/authentication';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet';
import HomeComponent from './pages/home';
import History from './pages/history';

function App() {
  return (
    <div className='App'>
       <BrowserRouter>
          <AuthProvider>

                  <Routes>
                      <Route path='/' element={<LandingPage/>}/>

                      <Route path='/auth' element={<Authentication/>}/>

                      <Route path='/home' element={<HomeComponent/>}/>

                      <Route path='/history' element={<History/>}/>

                      <Route path='/:url' element={<VideoMeetComponent/>} />

                </Routes>

           </AuthProvider>
       </BrowserRouter>
    </div>
  )
}

export default App
