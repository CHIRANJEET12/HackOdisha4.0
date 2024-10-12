import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
<<<<<<< HEAD
import AppRoutes from './Routes';
import { Outlet } from 'react-router-dom';
import DarkModeToggle from './components/DarkModeToggle';
import { DarkModeProvider } from './components/DarkModeContext'; // Import the context provider
=======
import AppRoutes from './Routes1';
>>>>>>> 31acb533fa1522e71b0f7b9f20b44b61dd84c439

function App() {
  return (
    <DarkModeProvider> {/* Wrap your app with DarkModeProvider */}
      <Router>
        <div>
          <DarkModeToggle />
          <Outlet />
          <AppRoutes />
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
