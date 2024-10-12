import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../components/DarkModeContext';
import '../css/RegistrationType.css'




export default function RegistrationType() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
const registerDelivery = () => {
  navigate('/regDel'); // Replace '/next-page' with the route you want to navigate to
};

const registerBuyer = () =>{
  navigate('/regBuyer');
};


const registerSeller = () =>{
  navigate('/regSeller');
};


return (
  <>
    <div className="container">
      <h1>What are you here for?</h1>
      <div className='reg-opt-div'>
        <div className='Reg-Card'>
          <p>Be our Delivery Partner!<i className="fa-solid fa-motorcycle"></i></p>
          <button className={darkMode ? 'dark-mode-button' : 'light-mode-button'} onClick={registerDelivery}>Register</button>
        </div>
        <div className='Reg-Card'>
          <p>Associate as Buyer<i className="fa-solid fa-shop"></i></p>
          <button className={darkMode ? 'dark-mode-button' : 'light-mode-button'} onClick={registerBuyer}>Register</button>
        </div>
        <div className='Reg-Card'>
          <p>Sell & Earn<i className="fa-solid fa-indian-rupee-sign"></i></p>
          <button className={darkMode ? 'dark-mode-button' : 'light-mode-button'} onClick={registerSeller}>Register</button>
        </div>
      </div>
    </div>
  </>
);

}
