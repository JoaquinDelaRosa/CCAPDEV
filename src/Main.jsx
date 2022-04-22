import {React} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Registration from './pages/registration';
import PostPage from './pages/postpage';
import Login from './pages/login';
import Feed from './pages/feed';
import Profile from './pages/profile'
import SettingsPage from './pages/settingspage';


const Main = ({profile, setProfile}) => {
  /* All links must be added here. File path is relative to Main. These replace hrefs*/
  return (
    <div>
      <Routes> 
          <Route path='/' element={<Home/>}></Route>
          <Route path="/registration" element={<Registration/>}></Route>
          <Route path="/postpage" element={<PostPage profile={profile}/>}></Route>
          <Route path="/postpage?" element={<PostPage profile={profile}/>}></Route>
          <Route path="/login" element={<Login profile={profile} setProfile={setProfile}/>}></Route>
          <Route path="/login?" element={<Home/>}></Route>
          <Route path="/feed" element={<Feed/>}></Route>
          <Route path="/profile" element={<Profile profileData={profile}/>}></Route>
          <Route path="/settings" element={<SettingsPage profile={profile} setProfile={setProfile}/>}></Route>
      </Routes>
    </div>
  );
}

export default Main;