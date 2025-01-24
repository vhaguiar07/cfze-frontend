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
