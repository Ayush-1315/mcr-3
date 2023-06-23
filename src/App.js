import './App.css';
import { Routes,Route} from 'react-router';

import { Home } from './pages/home/home';
import { Navbar } from './components/Navbar/navbar';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
