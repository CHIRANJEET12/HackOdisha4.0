import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistrationType from './pages/RegistrationType';
import DeliveryForm from './pages/DeliveryForm';
import SellerForm from './pages/SellerForm';
import BuyerForm from './pages/BuyerForm';
import Dashboard from './pages/Dashboard'; 
import { UserHomePage } from './pages/User-Home-Page';
import InputForm from './pages/InputForm';
import { Login } from './pages/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Registration" element={<RegistrationType/>} />
      <Route path="/create-post" element={<InputForm/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/regDel" element={<DeliveryForm/>} />
      <Route path="/regBuyer" element={<BuyerForm/>} />
      <Route path="/regSeller" element={<SellerForm/>} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/Userhomepage" element={<UserHomePage />} /> 
    </Routes>
  );
};

export default AppRoutes;