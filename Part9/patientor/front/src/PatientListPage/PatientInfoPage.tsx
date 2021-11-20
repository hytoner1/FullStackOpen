import React, { useState } from 'react';
import axios from "axios";
import { Container, Icon } from 'semantic-ui-react';
import {
  useParams
} from "react-router-dom";

import { HospitalEntryCard, OccupationalEntryCard, HealthCheckEntryCard } from "../components/EntryCards";

import { apiBaseUrl } from "../constants";
import { Diagnosis, Entry, Patient } from "../types";

import { useStateValue, updatePatient } from "../state";
import { Gender } from '../types';

const PatientInfoPage = () => {
  const { id } = useParams<{ id : string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];
  const [diagnosisList, setDiagnosisList] = useState <Array<Diagnosis>>([]);

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      console.log(`Fetching diagnoses`);
      try {
        const { data: diagnosisListFromApi } = await axios.get<Array<Diagnosis>>(
          `${apiBaseUrl}/Diagnoses`
        );
        setDiagnosisList(diagnosisListFromApi);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchDiagnoses();
  }, []);

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

  console.log('List:', diagnosisList);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryBox : React.FC<{ e : Entry }> = ({ e }) => {
    switch ( e.type ) {
      case "Hospital":
        return <HospitalEntryCard e={e} diagnosisList={diagnosisList} />;
      case "OccupationalHealthcare":
        return <OccupationalEntryCard e={e} diagnosisList={diagnosisList} />;
      case "HealthCheck":
        return <HealthCheckEntryCard e={e} diagnosisList={diagnosisList} />;
      default:
        return assertNever(e);
    }
  };

  return (
    <Container>
      <h2> {patient.name} {" "} <Icon name={patient.gender === Gender.Male ? "mars" : "venus"} /></h2>
      <p>
        SSN: {patient?.ssn}
        <br />
        Occupation: {patient.occupation}
      </p>

      <h3>Entries</h3>
      {patient.entries.map(e => EntryBox({ e })) }
    </Container>
  );
};

export default PatientInfoPage;