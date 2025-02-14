import axios from "axios";

export const searchEmployees = async (fullName: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee/search`, {
      params: { fullName, page, limit },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar funcionários.");
    } else {
      throw new Error("Erro desconhecido.");
    }
  }
};
