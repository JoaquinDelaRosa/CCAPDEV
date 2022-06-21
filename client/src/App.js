import Main from './Main';
import './App.css';
import Navbar from './pages/navbar';
import { useEffect, useState } from 'react';


const defaultContext = {
  username : "Steve"
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
