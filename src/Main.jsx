import {React} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Registration from './pages/registration';


const Main = () => {
  return (
    <Routes> 
        <Route path='/' element={<Home/>}></Route>
        <Route path="/registration" element={<Registration/>}></Route>
    </Routes>
  );
}

export default Main;