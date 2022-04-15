import Main from './Main';
import './App.css';
import Navbar from './pages/navbar';
import { useEffect, useState } from 'react';

function App() {

  const [profile, setProfile] = useState(true);

  useEffect( () => {
    setProfile(profile);
  }, [profile, setProfile])

  return (
    <div>
      <Navbar profile={profile} setProfile={setProfile}/>
      <Main profile={profile} setProfile={setProfile}/>
    </div>
  );
}

export default App;
