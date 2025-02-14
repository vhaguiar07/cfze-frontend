import React from 'react';
import { logoutUser } from '../../../api/authApi';
import { HOME_ACIDENTE } from '../../acidente/routes';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div style={styles.container}>
      <h1>Bem-vindo à Home Page</h1>
      <button style={styles.button} onClick={handleNavigateToAccidents}>Acidentes</button>
      <button style={styles.button} onClick={handleLogout}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default Home;
