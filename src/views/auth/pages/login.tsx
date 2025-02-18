import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Importando o Toastify
import { loginUser, validateUser } from '../../../api/authApi';
import { HOME } from '../../home/routes';
import './css/login.css'

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

    if (!username.trim() || !password.trim()) {
      toast.warn("Preencha usuário e senha antes de continuar", {
        toastId: "warning-login",
        autoClose: 5000,
        theme: "colored",
      });
      return;
    }

    setIsLoading(true);

    try {
      await loginUser(username, password);

      toast.success("Login bem-sucedido", {
        toastId: "success-login",
        autoClose: false,
        theme: "colored",
      });

      navigate(HOME());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro desconhecido', {
        toastId: "error-login",
        autoClose: 5000,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="main-containt">
        <div className="form-container-auth">
          <form className="form-auth" onSubmit={handleSubmit}>
            <div className="auth-div">
              <div className='auth-title'>
                <h1 className="h1-auth">SCF Login</h1>
                <p className='p-auth'>Por favor, entre com seu usuário e senha</p>
              </div>
              <div className="auth-fields">
                <p>Usuário</p>
                <div className="nice-form-group auth">
                  <input
                    id="text"
                    name="text"
                    className="nice-input"
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                </div>
                <p>Senha</p>
                <div className="nice-form-group auth">
                  <input
                    id="password"
                    name="password"
                    className="nice-input"
                    type="password"
                    placeholder="Senha"
                    autoComplete='new-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className="button-div auth">
                <button
                  className="button-submit"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Carregando...' : 'Entrar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
