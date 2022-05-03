import Main from './Main';
import './App.css';
import Navbar from './pages/navbar';
import { useEffect, useState } from 'react';


const placeHolder = {
  "id": 1,
  "pfp": require("../src/images/sample.png"),
  "name": "Andrei",
  "username": "AChua123",
  "password": "12345",
  "about": "A person lurking in this website (not a bot)",
  "gender": "Male",
  "saves": [],                // TO-DO store post id's associated with this user's favorite saves.
  "posts": [],
  "dateJoined": new Date(),
}

function App() {

  const [profile, setProfile] = useState(placeHolder);

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
