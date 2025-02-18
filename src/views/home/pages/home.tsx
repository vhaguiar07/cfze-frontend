import React from 'react';
import { logoutUser } from '../../../api/authApi';

import { HOME_ACIDENTE } from '../../acidente/routes';
import { HOME_BENEFICIO } from '../../beneficio/routes';
import { HOME_ATTENDANCE } from '../../attendance/routes';
import { HOME_PPE } from '../../ppe/routes';


import { useNavigate } from 'react-router-dom';
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

  const handleNavigateToAccidents = () => {
    navigate(HOME_ACIDENTE());
  };

  const handleNavigateToBenefits = () => {
    navigate(HOME_BENEFICIO());
  };

  const handleNavigateToAttendance = () => {
    navigate(HOME_ATTENDANCE());
  };

  const handleNavigateToPPE = () => {
    navigate(HOME_PPE());
  };

  return (
    <div className="container">
      <h1>Bem-vindo à Home Page</h1>
      <button className="button" onClick={handleNavigateToAccidents}>Acidentes</button>
      <button className="button" onClick={handleNavigateToBenefits}>Benefícios</button>
      <button className="button" onClick={handleNavigateToAttendance}>Frequência</button>
      <button className="button" onClick={handleNavigateToPPE}>EPI's</button>
      <button className="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
