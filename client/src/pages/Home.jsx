import { useDarkMode } from '../components/DarkModeContext'; // Import the context hook
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

export default function Home() {
  const { darkMode } = useDarkMode(); // Get the darkMode state
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/Registration'); // Replace '/next-page' with the route you want to navigate to
  };


  return (
    <div className="Intro">
      <h1 className="project-name">
        WELCOME TO <br />
        ReBookify
      </h1>
      <p>Where used books find new homes.</p>
      <button className={darkMode ? 'dark-mode-button' : 'light-mode-button'} onClick={handleGetStarted}>
        Get Started
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-right"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  );
}
