import './App.css';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './components/Home';
import PrivateRoute from './PrivateRoute';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" component={Login} />
      <Route path="/" component={Login} />

      <PrivateRoute path="/home" element={<Home />} />
    </Routes>
  </Router>
  );
}

export default App;
