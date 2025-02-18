import axios from "axios";
import { EmployeeBenefit } from "../interfaces/benefit-interface";

export const createEmployeeBenefit = async (benefitData: any) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/employee-benefit/create`,
      benefitData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao cadastrar benefício");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

export const listEmployeeBenefits = async (page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc") => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee-benefit/listAll`, {
      params: { page, limit, sortBy, sortOrder },
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar benefícios");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

export const updateEmployeeBenefit = async (benefitId: string, benefitData: Partial<EmployeeBenefit>) => {
  try {
    const filteredData = Object.fromEntries(
      Object.entries(benefitData).filter(([key]) => !["companyCnpj", "employeeCpf", "id"].includes(key))
    );

    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/employee-benefit/update/${benefitId}`,
      filteredData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao atualizar benefício:", error.response?.data);
      throw new Error(error.response?.data?.message || "Erro ao atualizar benefício");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

export const searchBenefitsByEmployeeName = async (fullName: string, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee-benefit/search`, {
      params: { fullName, page, limit },
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar benefícios");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};
