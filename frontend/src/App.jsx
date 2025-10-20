import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ResetPassword from './pages/auth/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        { /* Public Routes */ }
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/reset-password' element={<ResetPassword />}></Route>

        { /* Protected Routes */ }
        <Route element={<ProtectedRoute />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
