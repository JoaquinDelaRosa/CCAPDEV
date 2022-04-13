import {React} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Registration from './pages/registration';
import PostPage from './pages/postpage';
import Login from './pages/login';
import Feed from './pages/feed';


const Main = () => {
  /* All links must be added here. File path is relative to Main. These replace hrefs*/
  return (
    <Routes> 
        <Route path='/' element={<Home/>}></Route>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/postpage" element={<PostPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/feed" element={<Feed/>}></Route>
    </Routes>
  );
}

export default Main;