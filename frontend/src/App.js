import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './Components/Login/Login';
import SignUp from './Components/Sign Up/SignUp';
import Home from './Components/Home/Home';
import Logout from './Components/Logout/Logout';
import Search from './Components/Search/Search';
import { useEffect, useState } from 'react';
import Audio from './Components/Audio/Audio';
import Video from './Components/Video/Video';
import { createContext } from 'react';
import PodcastInfo from './Components/PodcastInfo/PodcastInfo';
import Like from './Components/Like/Like';

import { useContext } from 'react';
import { playerContext } from './context';

function App() {
  const[isplaying,setIsplaying]=useState(false)
  
  const[token,setToken]=useState("")
  const navigate=useNavigate();
  const checkToken=()=>{
    const token=localStorage.getItem('jwt');
    if(token){
      console.log('I have token');
    }
    else{
      console.log("I dont have token");
      navigate('/login')
    }
  }
  useEffect(()=>{
    checkToken();
  },[token])

  return (
    <playerContext.Provider value={{isplaying,setIsplaying}}>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/signup' element={<SignUp/>}></Route>
        <Route exact path='/logout' element={<Logout/>}></Route>
        <Route exact path='/search' element={<Search/>}></Route>
        <Route exact path='/create/audio' element={<Audio/>}></Route>
        <Route exact path='/create/video' element={<Video/>}></Route>
        <Route exact path='/podcasts/:podcastid' element={<PodcastInfo/>}></Route>
        <Route exact path='/like' element={<Like/>}></Route>
      </Routes>
    </div>
    </playerContext.Provider>
  );
}

export default App;
