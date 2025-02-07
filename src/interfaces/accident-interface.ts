export interface Accident {
  id: string;
  accidentNumber: string;
  accidentDate: string;
  employee: {
    fullName: string;
  };
  jobTitle: string;
  daysAway: number;
  accidentType: string;
  accidentDescription: string;
  accidentsWithLeave: boolean;
  bodyPartAffected: string;
  injurySeverity: string;
  accidentOrIncident: string;
  medicalCertificates: number;
  comments?: string;
}
