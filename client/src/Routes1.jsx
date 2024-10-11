import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InputForm from './components/InputForm';
import NearbyShops from './components/NearbyShops';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InputForm />} />
      <Route path="/shops" element={<NearbyShops />} />
    </Routes>
  );
};

export default AppRoutes;
