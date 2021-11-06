export enum Gender { 'male', 'female' };

export interface PatientData {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender;
  occupation: string
};

export type NonSensitivePatientData = Omit<PatientData, 'ssn'>;
export type NewPatientData = Omit<PatientData, 'id'>;

export interface DiagnoseData {
  code: string,
  name: string,
  latin?: string
};
