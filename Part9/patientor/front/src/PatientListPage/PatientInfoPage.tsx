import React, { useState } from 'react';
import axios from "axios";
import { Container, Dropdown, Icon } from 'semantic-ui-react';
import {
  useParams
} from "react-router-dom";

import { HospitalEntryCard, OccupationalEntryCard, HealthCheckEntryCard } from "../components/EntryCards";

import { apiBaseUrl } from "../constants";
import { Diagnosis, Entry, Patient } from "../types";
import { EntryFormValues } from "../components/AddEntryForm";
import { EntryFormValues_Hospital } from "../components/AddEntryForm_Hospital";
import { EntryFormValues_Occupational } from "../components/AddEntryForm_Occupational";

import { useStateValue, updatePatient, setDiagnoses } from "../state";
import { Gender } from '../types';
import AddEntryForm from '../components/AddEntryForm';
import AddEntryForm_Hospital from '../components/AddEntryForm_Hospital';
import AddEntryForm_Occupational from '../components/AddEntryForm_Occupational';

const PatientInfoPage = () => {
  const { id } = useParams<{ id : string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const patient = patients[id];
  const [diagnosisList, setDiagnosisList] = useState<Array<Diagnosis>>([]);
  const [visitType, setVisitType] = useState<string>("Hospital");

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      console.log(`Fetching diagnoses`);
      try {
        const { data: diagnosisListFromApi } = await axios.get<Array<Diagnosis>>(
          `${apiBaseUrl}/Diagnoses`
        );
        setDiagnosisList(diagnosisListFromApi);
        dispatch(setDiagnoses(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchDiagnoses();
  }, [dispatch]);

  const fetchPatientData = async () => {
    console.log(`Fetchind data for ${id}`);
    try {
      const { data: patientData } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(updatePatient(patientData));
    } catch (e) {
      console.error(e);
    }
  };

  if (!patient) {
    return null;
  }

  if (!patient.ssn) { // If no SSN, fetch the full patient data
    void fetchPatientData();
  }

  console.log('DiagnosisList:', diagnoses);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const submitNewEntry = async (values : EntryFormValues) => {
    if (!values.diagnosisCodes || values.diagnosisCodes.length === 0) {
      delete values.diagnosisCodes;
    }

    try {
      const { data: modifiedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "UPDATE_PATIENT", payload: modifiedPatient });
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
    }
  };

  const submitNewEntry_Hospital = async (values : EntryFormValues_Hospital) => {
    try {
      if (!values.diagnosisCodes || values.diagnosisCodes.length === 0) {
        delete values.diagnosisCodes;
      }

      const { data: modifiedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log('mod patient:', modifiedPatient);
      dispatch({ type: "UPDATE_PATIENT", payload: modifiedPatient });
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
    }
    console.log('patients', patients);
  };

  const submitNewEntry_Occupational = async (values : EntryFormValues_Occupational) => {
    if (!values.sickLeave || values.sickLeave.startDate === '') {
      delete values.sickLeave;
    }

    if (!values.diagnosisCodes || values.diagnosisCodes.length === 0) {
      delete values.diagnosisCodes;
    }

    try {
      const { data: modifiedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "UPDATE_PATIENT", payload: modifiedPatient });
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
    }
  };

  const EntryBox : React.FC<{ e : Entry }> = ({ e }) => {
    switch ( e.type ) {
      case "Hospital":
        return <HospitalEntryCard e={e} diagnosisList={diagnosisList} key={e.id} />;
      case "OccupationalHealthcare":
        return <OccupationalEntryCard e={e} diagnosisList={diagnosisList} key={e.id}/>;
      case "HealthCheck":
        return <HealthCheckEntryCard e={e} diagnosisList={diagnosisList} key={e.id}/>;
      default:
        return assertNever(e);
    }
  };

  // eslint-disable-next-line
  const handleDropdownChange = (e:any, { value }:any) => setVisitType(value);
  const visitTypes = [
    { text: 'Hospital', value: 'Hospital' },
    { text: 'Occupational', value: 'OccupationalHealthcare' },
    { text: 'Health Check', value: 'HealthCheck' },

  ];

  return (
    <Container>
      <h2> {patient.name} {" "} <Icon name={patient.gender === Gender.Male ? "mars" : "venus"} /></h2>
      <p>
        SSN: {patient?.ssn}
        <br />
        Occupation: {patient.occupation}
      </p>

      <h3>Entries</h3>
      {patient.entries.map(e => EntryBox({ e }))}

      <h3>Add new entry</h3>
      <Dropdown
        placeholder='Visit type'
        name='visitType'
        onChange={handleDropdownChange}
        selection
        options={visitTypes}
      />

      {visitType === 'Hospital' && (
        <AddEntryForm_Hospital onSubmit={submitNewEntry_Hospital}/>
      )}
      {visitType === 'OccupationalHealthcare' && (
        <AddEntryForm_Occupational onSubmit={submitNewEntry_Occupational} />
      )}
      {visitType === 'HealthCheck' && (
        <AddEntryForm onSubmit={submitNewEntry} />
      )}
    </Container>
  );
};

export default PatientInfoPage;