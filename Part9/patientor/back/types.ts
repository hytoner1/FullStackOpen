export enum Gender { 'male', 'female' };

export interface PatientData {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
};

export type PublicPatientData = Omit<PatientData, 'ssn' | 'entries'>;
export type NewPatientData = Omit<PatientData, 'id'>;

export interface DiagnoseData {
  code: string,
  name: string,
  latin?: string
};

export interface Entry {
}