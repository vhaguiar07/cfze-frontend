import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CADASTRO_CUSTO_ACIDENTE } from '../routes';

const HomeAcidente = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Gestão de Acidentes</h1>
      <button style={styles.button} onClick={() => navigate(CADASTRO_CUSTO_ACIDENTE())}>
        Cadastrar Custo do Acidente
      </button>
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
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default HomeAcidente;
