import Main from './Main';
import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Link to="./registration">
        <button variant="outlined">
          Sign up
        </button>
      </Link>

      
      <Main/>
    </div>
  );
}

export default App;
