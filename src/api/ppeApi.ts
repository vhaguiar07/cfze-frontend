import axios from 'axios';

export const createEmployeePPERecord = async (ppeData: any) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/employee-ppe/create`,
      ppeData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao cadastrar registro de EPI");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

export const listEmployeePPERecords = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee-ppe/listAll`, {
      params: { page, limit },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao listar registros de EPI");
  }
};

export const updateEmployeePPERecord = async (id: string, updatedData: any) => {
  try {
    console.log("Enviando requisição para atualizar EPI:");
    console.log("Endpoint:", `${process.env.REACT_APP_BACKEND_URL}/employee-ppe/update/${id}`);
    console.log("Dados enviados:", updatedData);

    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/employee-ppe/update/${id}`,
      updatedData,
      {
        withCredentials: true,
      }
    );

    console.log("Resposta recebida:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na requisição:", error.response?.data);
      throw new Error(error.response?.data?.message || "Erro ao atualizar registro de EPI");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

export const searchPPERecordsByEmployeeName = async (fullName: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee-ppe/search`, {
      params: { fullName, page, limit },
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar registros de EPI");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};
