import axios from 'axios';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      { username, password },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer logout');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const validateUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/auth/validate`,
      {
        withCredentials: true, 
      }
    );

    return response.data.user;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Usuário não autenticado');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};
