import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes'; // Kept the AppRoutes from 'Routes'
import { Outlet } from 'react-router-dom';
import DarkModeToggle from './components/DarkModeToggle';
import { DarkModeProvider } from './components/DarkModeContext'; // Import the context provider

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
