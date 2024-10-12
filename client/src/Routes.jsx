import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistrationType from './pages/RegistrationType';
import DeliveryForm from './pages/DeliveryForm';
import SellerForm from './pages/SellerForm';
import BuyerForm from './pages/BuyerForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Registration" element={<RegistrationType/>} />
      <Route path="/regDel" element={<DeliveryForm/>} />
      <Route path="/regBuyer" element={<BuyerForm/>} />
      <Route path="/regSeller" element={<SellerForm/>} />
    </Routes>
  );
};

export default AppRoutes;