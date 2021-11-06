export type Gender = 'male' | 'female';

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender;
  occupation: string
}