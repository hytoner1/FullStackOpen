import React from 'react';
import axios from "axios";
import { Icon } from 'semantic-ui-react';
import {
  useParams
} from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

import { useStateValue, updatePatient } from "../state";
import { Gender } from '../types';

const PatientInfoPage = () => {
  const { id } = useParams<{ id : string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

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

  if (!patient.ssn) { // If no SSN, fetch the full patient data
    void fetchPatientData();
  }

  return (
    <div>
      <h2> {patient.name} {" "} <Icon name={patient.gender === Gender.Male ? "mars" : "venus"} /></h2>
      SSN: {patient?.ssn}
      <br />
      Occupation: {patient.occupation}
    </div>
  );
};

export default PatientInfoPage;