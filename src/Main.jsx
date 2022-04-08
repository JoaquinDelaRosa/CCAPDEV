import {React} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Registration from './pages/registration';
import PostPage from './pages/postpage';


const Main = () => {
  return (
    <Routes> 
        <Route path='/' element={<Home/>}></Route>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/postpage" element={<PostPage/>}></Route>
    </Routes>
  );
}

export default Main;