import axios from "axios";
import { UpdateAttendanceRecord } from "../interfaces/attendance-interface";

export const listAttendanceRecords = async (
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc"
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/employee-attendance/listAll`,
      {
        params: { page, limit, sortBy, sortOrder },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar registros de faltas");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

export const searchAttendanceRecordsByEmployeeName = async (
  fullName: string,
  page = 1,
  limit = 10
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/employee-attendance/search`,
      {
        params: { fullName, page, limit },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar registros de frequência");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

export const createAttendanceRecord = async (attendanceData: any) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/employee-attendance/create`,
      attendanceData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao cadastrar frequência");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

export const updateAttendanceRecord = async (id: string, updatedData: UpdateAttendanceRecord) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/employee-attendance/update/${id}`,
      updatedData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao atualizar frequência");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};
