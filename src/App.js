import logo from './logo.svg';
import './App.css';
import Navbar from './components/ThePets'
import {Link} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <li><Link to="/">Update from mutation</Link></li>
      <li><Link to="/basicPets">Basic Pets</Link></li>
    </div>
  );
}

export default App;
