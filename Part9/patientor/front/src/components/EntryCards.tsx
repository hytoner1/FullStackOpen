import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

import { Diagnosis, Entry } from "../types";

const HospitalEntry: React.FC<{ e: Entry, diagnosisList: Diagnosis[] }> = ({ e, diagnosisList}) => {
  return (
    <Card.Group key={e.id}>
      <b> {e.date} </b>  <Icon name="hospital symbol" style={{marginLeft:'.5rem'}}/>
      <br />
      {e.description}

      <ul>
        {e.diagnosisCodes && e.diagnosisCodes.map(d =>
          <li key={d}>{d}: {diagnosisList.find(diagnosis => diagnosis.code === d)?.name}</li>
        )}
      </ul>
    </Card.Group>
  );
};

export { HospitalEntry };