// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import PrivateRoute from './PrivateRoute';
import { Home } from './components/Home';
import { Register } from './components/register';
import { EditProfil } from './components/EditProfil';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/edit" element={<PrivateRoute element={<EditProfil />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />      </Routes>
    </Router>
  );
}

export default App;
