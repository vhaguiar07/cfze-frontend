import axios from 'axios';

export const createEmployee = async (employeeData: Record<string, unknown>) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/employees/create`,
      employeeData,
      { withCredentials: true }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao criar funcionário');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};
