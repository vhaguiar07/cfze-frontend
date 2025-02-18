export interface AttendanceRecord {
  id: string;
  employeeCpf: string;
  employeeFullName: string;
  companyCnpj: string;
  area?: string;
  jobTitle: string;
  referencePeriod: string;
  absenceDescription?: string;
  situation: string;
  workDays: number;
  absences: number;
  medicalLeaveDays: number;
  extraDays: number;
  justifiedAbsenceDays: number;
  workedDays: number;
  date: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAttendanceRecord {
  referencePeriod?: string;
  area?: string;
  jobTitle?: string;
  absenceDescription?: string;
  situation?: string;
  workDays?: number;
  absences?: number;
  medicalLeaveDays?: number;
  extraDays?: number;
  justifiedAbsenceDays?: number;
  workedDays?: number;
  comments?: string;
}
