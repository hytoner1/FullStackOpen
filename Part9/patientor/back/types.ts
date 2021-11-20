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

interface BaseEntry {
  id : string;
  type : EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseData['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthCare;
  sickLeave?: SickLeave;
  employerName: string;
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthCareEntry;

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthCare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
export type NewEntry = DistributiveOmit<Entry, 'id'>;
export type NewBaseEntry = Omit<BaseEntry, 'id'>;
