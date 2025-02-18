export interface EmployeePPEControl {
  id: string;
  employeeName: string;
  ppeDescription: string;
  department: string;
  referenceMonth: string;
  situation: string;
  quantity: number;
  reasonForReplacement?: string;
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeePPEUpdate {
  id: string;
  ppeDescription: string;
  department: string;
  referenceMonth: string;
  situation: string;
  quantity: number;
  reasonForReplacement?: string;
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
}
