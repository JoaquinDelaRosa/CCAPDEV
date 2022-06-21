import Main from './Main';
import './App.css';
import Navbar from './pages/navbar';
import { useEffect, useState } from 'react';


const defaultContext = {
  id : "3c5d1be5-f53e-4580-91e6-cb9718692d11"
}

function App() {

  const [context, setContext] = useState(defaultContext);

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
