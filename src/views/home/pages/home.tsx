import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../api/authApi';

import { HOME_ACIDENTE } from '../../acidente/routes';
import { HOME_BENEFICIO } from '../../beneficio/routes';
import { HOME_ATTENDANCE } from '../../attendance/routes';
import { HOME_PPE } from '../../ppe/routes';

import './css/home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      alert('Logout realizado com sucesso!');
      window.location.href = '/login';
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  return (
    <div className="container">
      <img src="/path-to-your-hero-image.jpg" alt="Hero" className="hero-image" />

      <div className="button-container">
        <div className="button-wrapper">
          <button className="button" onClick={() => navigate(HOME_ACIDENTE())}>
            Acidentes
          </button>
        </div>

        <div className="button-wrapper">
          <button className="button" onClick={() => navigate(HOME_BENEFICIO())}>
            Benefícios
          </button>
        </div>

        <div className="button-wrapper">
          <button className="button" onClick={() => navigate(HOME_ATTENDANCE())}>
            Frequência
          </button>
        </div>

        <div className="button-wrapper">
          <button className="button" onClick={() => navigate(HOME_PPE())}>
            EPI's
          </button>
        </div>
      </div>

      <button className="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
