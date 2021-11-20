import {
  NewPatientData, Gender,
  NewBaseEntry, NewEntry, EntryType,
  Discharge
} from './types';

const isString = (text : unknown) : text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (txt: unknown, what: string) : string => {
  if (!txt || !isString(txt)) {
    throw new Error(`Error parsing ${what} to string!`);
  }

  return txt;
};

const isGender = (param : any) : param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender : unknown) : Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = { name : unknown, dateOfBirth : unknown, ssn : unknown, gender : unknown, occupation : unknown  };
export const toNewPatientData = (object: Fields): NewPatientData => {
  const newData: NewPatientData = {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseString(object.dateOfBirth, 'DoB'),
    ssn: parseString(object.ssn, 'SSN'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    entries: []
  }

  return newData;
}

const isStringArray = (array: any) => {
  return !array.some((item: any) => { return !isString(item) });
}

const parseDiagnosisCodes = (diagnosisCodes: any) => {
  if (!Array.isArray(diagnosisCodes) || !isStringArray(diagnosisCodes)) {
    throw new Error('diagnosis codes is not an array.');
  }

  return diagnosisCodes;
}

const isEntryType = (param : any) : param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (type: any) : EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing gender: ' + type);
  }

  return type;
}

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseEntryType(object.type),
    description: parseString(object.description, 'description'),
    date: parseString(object.date, 'date'),
    specialist: parseString(object.specialist, 'specialist'),
  }

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
}

const parseDischarge = (object : any) : Discharge => {
  if (!object) {
    throw new Error('Missing discharge');
  }

  return {
    date: parseString(object.date, 'discharge date'),
    criteria: parseString(object.criteria, 'discharge cirteria')
  }
}

export const toNewEntry = (object : any) : NewEntry => {
  const newBaseEntry = toNewBaseEntry(object) as NewEntry;

  switch (newBaseEntry.type) {
    case EntryType.Hospital:
      return {
        ...newBaseEntry, discharge: parseDischarge(object.discharge)
      }

    case EntryType.OccupationalHealthCare:
      return {
        ...newBaseEntry, employerName: parseString(object.employerName, 'employer name')
      }

    case EntryType.HealthCheck:
      return {
        ...newBaseEntry, healthCheckRating: parseInt(object.healthCheckRating)
      }
  }
}

