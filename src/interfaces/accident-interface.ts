export interface Accident {
  id: string;
  accidentNumber: string;
  accidentDate: string;
  employee: {
    fullName: string;
  };
  jobTitle: string;
  daysAway: number;
  hoursAway: number;
  accidentType: string;
  accidentDescription: string;
  accidentsWithLeave: boolean;
  bodyPartAffected: string;
  injurySeverity: string;
  accidentOrIncident: string;
  medicalCertificates: number;
  comments?: string;
  accidentCost?: AccidentCost;
}

export interface UpdateAccidentControl {
  id: string;
  accidentNumber?: string;
  accidentDate?: string;
  accidentType?: string;
  accidentDescription?: string;
  accidentsWithLeave?: boolean;
  bodyPartAffected?: string;
  injurySeverity?: string;
  accidentOrIncident?: string;
  medicalCertificates?: number;
  daysAway?: number;
  hoursAway: number;
  comments?: string;
}

export interface AccidentCost {
  id: string;
  medicationCost: number;
  foodCost: number;
  materialCost: number;
  legalCost: number;
  totalCost: number;
  comments?: string;
}
