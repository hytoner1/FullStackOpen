import React, { useState } from 'react';
import axios from "axios";
import { Icon } from 'semantic-ui-react';
import {
  useParams
} from "react-router-dom";

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

  const EntryBox = (e : Entry) => {
  //  const DiagnosisListItem = (diagnosisCode: string) => {
  //    return (

  //    );
  //  };

    return (
      <div key={e.id}>
        <b> {e.date}: </b>
        {e.description}
        <ul>
          {e.diagnosisCodes && e.diagnosisCodes.map(d =>
            <li key={d}>{d}: {diagnosisList.find(diagnosis => diagnosis.code === d)?.name}</li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h2> {patient.name} {" "} <Icon name={patient.gender === Gender.Male ? "mars" : "venus"} /></h2>
      <p>
        SSN: {patient?.ssn}
        <br />
        Occupation: {patient.occupation}
      </p>

      <h3>Entries</h3>
      { patient.entries.map(e => EntryBox(e)) }
    </div>
  );
};

export default PatientInfoPage;