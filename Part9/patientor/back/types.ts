export type Gender = 'male' | 'female';

export interface PatientData {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender;
  occupation: string
};

export type NonSensitivePatientData = Omit<PatientData, 'ssn'>;