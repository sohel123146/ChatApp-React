import './App.css';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import NavBar from './Components/NavBar';

function App() {
  return (
      <BrowserRouter>
        <NavBar/>
        <div className="container text-light">
          <Routes>
            <Route exact path='/' element={<Chat/>}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/signup' element={<Signup/>}></Route>
            <Route exact path='*' element={<Navigate to='/'/>}></Route>
          </Routes>
        </div>
        </BrowserRouter>
  );
}

export default App;
