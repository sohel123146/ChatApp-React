import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import NavBar from './Components/NavBar';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { ChatContextProvider } from './context/chatContext';
import PotentialChats from './Components/chat/PotentialChats';


function App() {  
  const {user} = useContext(AuthContext)
  return (
    <ChatContextProvider user={user}>
      <PotentialChats/>  
        <NavBar/>
        <div className="container text-light">
          <Routes>
            <Route exact path='/' element={user ? <Chat/> : <Login/>}></Route>
            <Route exact path='/login' element={user ? <Chat/> : <Login/>}></Route>
            <Route exact path='/signup' element={user ? <Chat/> : <Signup/>}></Route>
            <Route exact path='*' element={<Navigate to='/'/>}></Route>
          </Routes>
        </div>
    </ChatContextProvider>
  );
}

export default App;
