import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './components/auth/ProtectedRoute.jsx';
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import Error from './pages/Error.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './pages/Footer.jsx';
import AddProduct from './pages/product/AddProduct.jsx';
import EditProduct from './pages/product/EditProduct.jsx';
import ProductDetail from './pages/product/ProductDetail.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <CartDrawer />
      <Routes>
        { /* Public Routes */ }
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        { /* Protected Routes - Require Authentication */ }
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/product/:productId' element={<ProductDetail />} />
        </Route>

        { /* Admin Routes - Require Authentication + Admin Status */ }
        <Route element={<AdminRoute />}>
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/edit-product/:productId' element={<EditProduct />} />
        </Route>

        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
