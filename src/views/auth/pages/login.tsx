import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, validateUser } from '../../../api/authApi';
import { HOME } from '../../home/routes';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = await validateUser();
        if (user) {
          navigate(HOME());
        }
      } catch (error) {
        console.log('Usuário não autenticado, continue para login.');
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginUser(username, password);
      alert('Login bem-sucedido');
      navigate(HOME());
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
