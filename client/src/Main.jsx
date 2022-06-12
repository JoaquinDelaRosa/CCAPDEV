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


const Main = ({context, setContext}) => {
  /* All links must be added here. File path is relative to Main. These replace hrefs*/
  return (
    context && setContext &&
    <div>
      <Routes> 
          <Route path='/' element={<Feed/>}></Route>
          <Route path="/registration" element={<Registration/>}></Route>
          <Route path="/postpage/:postid" element={<PostPage context={context} setContext={setContext}/>}></Route>
          <Route path="/login" element={<Login context={context} setContext={setContext}/>}></Route>
          <Route path="/feed" element={<Feed context={context} setContext={setContext} />}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/settings" element={<SettingsPage context={context} setContext={setContext}/>}></Route>
          <Route path="/dangerpage" element={<DangerPage context={context} setContext={setContext}/>}></Route>
          <Route path="/upload" element={<UploadPage context={context}/>}> </Route>

      </Routes>
    </div>
  );
}

export default Main;