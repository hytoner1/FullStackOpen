import React from 'react';
import { Icon } from 'semantic-ui-react';

import {
  Diagnosis,
  HealthCheckEntry, HealthCheckRating, HospitalEntry,
  OccupationalHealthCareEntry
} from "../types";

const HospitalEntryCard : React.FC<{ e : HospitalEntry, diagnosisList : Diagnosis[] }> = ({ e, diagnosisList }) => {
  return (
    <div style={{ border: '2px solid', marginBottom: '10px' }}>
      <b> {e.date} </b>  <Icon name="hospital symbol" style={{ marginLeft: '.5rem' }} />
      {e.description}
      <br />
      <br />
      <b>Discharge:</b> {e.discharge.date} -- {e.discharge.criteria}

      <ul>
        {e.diagnosisCodes && e.diagnosisCodes.map(d =>
          <li key={d}>{d}: {diagnosisList.find(diagnosis => diagnosis.code === d)?.name}</li>
        )}
      </ul>
    </div>
  );
};

const OccupationalEntryCard : React.FC<{ e : OccupationalHealthCareEntry, diagnosisList : Diagnosis[] }> = ({ e, diagnosisList }) => {
  return (
    <div style={{ border: '2px solid ', marginBottom: '10px' }}>
      <b> {e.date} </b>
      <Icon name="user md" style={{ marginLeft: '.5rem' }} />
      <b>{e.employerName}</b>
      <br />
      {e.description}
      <br />
      <br />
      {e.sickLeave && (`Sick leave: ${e.sickLeave.startDate} -- ${e.sickLeave.endDate}`)}

      <ul>
        {e.diagnosisCodes && e.diagnosisCodes.map(d =>
          <li key={d}>{d}: {diagnosisList.find(diagnosis => diagnosis.code === d)?.name}</li>
        )}
      </ul>
    </div>
  );
};

const HealthCheckEntryCard : React.FC<{ e : HealthCheckEntry, diagnosisList : Diagnosis[] }> = ({ e, diagnosisList }) => {
  return (
    <div style={{ border: '2px solid ', marginBottom: '10px' }}>
      <b> {e.date} </b>  <Icon name="heart outline" style={{ marginLeft: '.5rem' }} />
      <br />
      {e.description}

      <ul>
        {e.diagnosisCodes && e.diagnosisCodes.map(d =>
          <li key={d}>{d}: {diagnosisList.find(diagnosis => diagnosis.code === d)?.name}</li>
        )}
      </ul>

      <Icon name="heart" style={{
        marginLeft: '1rem',
        color: e.healthCheckRating > 0 ? 'gray' : 'red'
      }} />
      {HealthCheckRating[e.healthCheckRating]}
    </div>
  );
};

export { HospitalEntryCard, OccupationalEntryCard, HealthCheckEntryCard };