import {React} from 'react';
import { Routes, Route } from 'react-router-dom';
import Registration from './pages/registration';
import PostPage from './pages/postpage';
import Login from './pages/login';
import Feed from './pages/feed';
import Profile from './pages/profile'
import SettingsPage from './pages/settingspage';
import DangerPage from './pages/dangerzone';
import UploadPage from './pages/uploadpage';


const Main = ({profile, setProfile}) => {
  /* All links must be added here. File path is relative to Main. These replace hrefs*/
  return (
    <div>
      <Routes> 
          <Route path='/' element={<Feed/>}></Route>
          <Route path="/registration" element={<Registration/>}></Route>
          <Route path="/postpage/:postid" element={<PostPage profile={profile} setProfile={setProfile}/>}></Route>
          <Route path="/login" element={<Login profile={profile} setProfile={setProfile}/>}></Route>
          <Route path="/login?" element={<Feed/>}></Route>
          <Route path="/feed" element={<Feed/>}></Route>
          <Route path="/profile" element={<Profile profileData={profile}/>}></Route>
          <Route path="/settings" element={<SettingsPage profile={profile} setProfile={setProfile}/>}></Route>
          <Route path="/dangerpage" element={<DangerPage profile={profile} setProfile={setProfile}/>}></Route>
          <Route path="/upload" element={<UploadPage profile={profile}/>}> </Route>
      </Routes>
    </div>
  );
}

export default Main;