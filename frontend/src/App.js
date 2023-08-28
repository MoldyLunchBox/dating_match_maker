// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './components/pages/Login';
import PrivateRoute from './PrivateRoute';
import { Register } from './components/pages/register';
import { Search } from './components/pages/Search';
import Chat from './components/pages/Chat';
import { EditProfil } from './components/pages/EditProfil';
import { Friends } from './components/pages/Friends';
import { Home } from './components/pages/Home';
import { Match } from './components/pages/Match';
// import { Home } from 'react-feather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/Search" element={<PrivateRoute element={<Search />} />} />
        <Route path="/Friends" element={<PrivateRoute element={<Friends />} />} />
        <Route path="/Chat" element={<PrivateRoute element={<Chat />} />} />
        <Route path="/match" element={<PrivateRoute element={<Match />} />} />
        <Route path="/edit" element={<PrivateRoute element={<EditProfil />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />    
          </Routes>
    </Router>
  );
}

export default App;
