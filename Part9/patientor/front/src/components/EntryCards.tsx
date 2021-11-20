import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

import {
  Diagnosis,
  HealthCheckEntry, HospitalEntry,
  OccupationalHealthCareEntry
} from "../types";

const HospitalEntryCard: React.FC<{ e: HospitalEntry, diagnosisList: Diagnosis[] }> = ({ e, diagnosisList}) => {
  return (
    <>
    <Card.Group key={e.id}>
      <b> {e.date} </b>  <Icon name="hospital symbol" style={{marginLeft:'.5rem'}}/>
      <br />
      {e.description}
    </Card.Group>

    <Card.Group >
      <ul>
        {e.diagnosisCodes && e.diagnosisCodes.map(d =>
          <li key={d}>{d}: {diagnosisList.find(diagnosis => diagnosis.code === d)?.name}</li>
        )}
      </ul>
      <br />
    </Card.Group>
    </>
  );
};

const OccupationalEntryCard : React.FC<{ e : OccupationalHealthCareEntry, diagnosisList : Diagnosis[] }> = ({ e, diagnosisList }) => {
  return (
    <>
    <Card.Group key={e.id}>
      <b> {e.date} </b>
      <Icon name="user md" style={{ marginLeft: '.5rem' }} />
      <b>{e.employerName}</b>
      <br />
      {e.description}
      </Card.Group>

      <Card.Group>
      <ul>
        {e.diagnosisCodes && e.diagnosisCodes.map(d =>
          <li key={d}>{d}: {diagnosisList.find(diagnosis => diagnosis.code === d)?.name}</li>
        )}
      </ul>
    </Card.Group>
    </>
  );
};

const HealthCheckEntryCard : React.FC<{ e : HealthCheckEntry, diagnosisList : Diagnosis[] }> = ({ e, diagnosisList }) => {
  return (
    <>
    <Card.Group key={e.id}>
      <b> {e.date} </b>  <Icon name="heart outline" style={{ marginLeft: '.5rem' }} />
      <br />
      {e.description}
      </Card.Group>

    <Card.Group >
      <ul>
        {e.diagnosisCodes && e.diagnosisCodes.map(d =>
          <li key={d}>{d}: {diagnosisList.find(diagnosis => diagnosis.code === d)?.name}</li>
        )}
      </ul>

        <Icon name="heart" style={{
          marginLeft: '4rem',
          color: e.healthCheckRating > 0 ? 'red' : 'green'
        }} />
      </Card.Group>
      </>
  );
};

export { HospitalEntryCard, OccupationalEntryCard, HealthCheckEntryCard };