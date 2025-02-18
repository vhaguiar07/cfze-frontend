export interface EmployeeBenefit {
  id: string;
  employeeCpf: string;
  companyCnpj: string;
  benefit: string;
  referencePeriod: string;
  type: string;
  area: string;
  jobTitle: string;
  mealVoucherPrice: number;
  workDays: number;
  extraDays: number;
  justifiedAbsenceDays: number;
  paidDays: number;
  totalPrice: number;
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
}
