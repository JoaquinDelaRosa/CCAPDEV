import Main from './Main';
import './App.css';
import Navbar from './pages/navbar';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const defaultContext = {
  id : ""
}

function App() {

  const [context, setContext] = useState(defaultContext);
  if (Cookies.get("id") === undefined)
    Cookies.set("id", "");

  useEffect( () => {
    setContext(context);
  }, [context, setContext])

  return (
    <div>
      <Navbar context={context} setContext={setContext}/>
      <Main context={context} setContext={setContext}/>
    </div>
  );
}

export default App;
