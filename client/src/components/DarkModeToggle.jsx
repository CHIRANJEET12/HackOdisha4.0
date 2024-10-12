import React from 'react';
import { useDarkMode } from './DarkModeContext'; // Import the context hook
import './DarkMode.css';

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode(); // Get darkMode state and toggle function

  return (
    <div className='dark-mode'>
      <i className={darkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} onClick={toggleDarkMode}>
        <p>{darkMode ? 'Light Mode' : 'Dark Mode'}</p>
      </i>
    </div>
  );
}

export default DarkModeToggle;
