import axios from 'axios';

export const createAccident = async (accidentData: any) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/accident-control/create`, accidentData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao cadastrar acidente');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const updateAccident = async (accidentId: string, accidentData: any) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/accident-control/update/${accidentId}`, accidentData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar acidente');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const listAccidents = async (page = 1, limit = 10, sortBy = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/accident-control/listAll`, {
      params: { page, limit, sortBy, sortOrder },
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao listar acidentes');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const searchAccidentsByEmployeeName = async (fullName: string, page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/accident-control/search`,
      { params: { fullName, page, limit }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar acidentes");
    }
    throw new Error("Erro desconhecido");
  }
};

export const createAccidentCost = async (accidentCostData: any) => {
  try {
    console.log('Enviando requisição para cadastrar custo do acidente:', accidentCostData);
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/accident-cost/create`,
      accidentCostData,
      { withCredentials: true }
    );
    console.log('Resposta recebida:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na requisição:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Erro ao cadastrar custo do acidente');
    } else {
      console.error('Erro desconhecido:', error);
      throw new Error('Erro desconhecido');
    }
  }
};

export const updateAccidentCost = async (accidentCostId: string, accidentCostData: any) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/accident-cost/update/${accidentCostId}`,
      accidentCostData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar custo do acidente');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const listAccidentCosts = async (page = 1, limit = 10, sortBy = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/accident-cost/listAll`, {
      params: { page, limit, sortBy, sortOrder },
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao listar custos de acidentes');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const getAccidentCostById = async (id: string) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/accident-cost/findOne/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar custo do acidente');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};
