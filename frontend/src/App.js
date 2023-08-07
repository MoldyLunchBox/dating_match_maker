// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import PrivateRoute from './PrivateRoute';
import { Home } from './components/Home';
import { Register } from './components/register';
import { EditProfil } from './components/EditProfil';
import { Search } from './components/Search';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/Search" element={<PrivateRoute element={<Search />} />} />
        <Route path="/Chat" element={<PrivateRoute element={<Chat />} />} />
        <Route path="/edit" element={<PrivateRoute element={<EditProfil />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />      </Routes>
    </Router>
  );
}

export default App;
