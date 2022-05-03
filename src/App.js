import Main from './Main';
import './App.css';
import Navbar from './pages/navbar';
import { useEffect, useState } from 'react';

import {p} from '../src/pages/placeholder' // import placeholder data


const placeHolder = {
  "id": 1,
  "pfp": require("../src/images/sample.png"),
  "name": "Andrei",
  "username": "AChua123",
  "password": "12345",
  "about": "A person lurking in this website (not a bot)",
  "gender": "Male",
  "saves": p.map((x) => x),                // TO-DO store post id's associated with this user's favorite saves.
  "posts": p.map((x) => x),
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
