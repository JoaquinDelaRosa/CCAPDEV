import Main from './Main';
import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Link to="./registration">
        {/* Change this button to a navigation bar*/}

        <button className="hover:bg-sky-600">
          Sign up
        </button>
      </Link>

      <Link to="./postpage">
        {/* Change this button to a navigation bar*/}

        <button className="hover:bg-sky-600">
          Posts
        </button>
      </Link>
      
      <Main/>
    </div>
  );
}

export default App;
