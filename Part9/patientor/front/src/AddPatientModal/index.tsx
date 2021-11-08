import React from 'react';
import { Modal, Segment, Icon } from 'semantic-ui-react';
import AddPatientForm, { PatientFormValues } from './AddPatientForm';

import { useStateValue } from "../state";
import { Gender } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

interface InfoProps {
  selectedPatient?: string
  modalOpen: boolean;
  onClose: () => void;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

const PatientInfoModal = ({ selectedPatient, modalOpen, onClose } : InfoProps) => {
  const [{ patients }] = useStateValue();

  if (!selectedPatient) {
    return (null);
  }
  const patient = patients[selectedPatient];

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Patient Info</Modal.Header>
      <Modal.Content>
        <h2> {patient.name} {" "} <Icon name={patient.gender === Gender.Male ? "mars" : "venus"}/></h2>
        SSN: {patient?.ssn}
        <br />
        Occupation: {patient.occupation}

      </Modal.Content>
    </Modal>
  );
};

export { AddPatientModal, PatientInfoModal };
