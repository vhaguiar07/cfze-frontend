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
