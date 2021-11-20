export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

interface BaseEntry {
  id : string;
  description : string;
  date : string;
  specialist : string;
  diagnosisCodes ?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface Discharge {
  date : string;
  criteria : string;
}

export interface HospitalEntry extends BaseEntry {
  type : "Hospital";
  discharge : Discharge;
}

interface SickLeave {
  startDate : string;
  endDate : string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type : "OccupationalHealthcare";
  sickLeave ?: SickLeave;
  employerName : string;
}

export interface HealthCheckEntry extends BaseEntry {
  type : "HealthCheck";
  healthCheckRating : HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthCareEntry;
