import { NewPatientData, Gender } from './types';

const isString = (text : unknown) : text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (txt: unknown, what: string) : string => {
  if (!txt || !isString(txt)) {
    throw new Error(`Error parsing ${what} to string!`);
  }

  return txt;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
const toNewPatientData = (object: Fields): NewPatientData => {
  const newData: NewPatientData = {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseString(object.dateOfBirth, 'DoB'),
    ssn: parseString(object.ssn, 'SSN'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation')
  }

  return newData;
}

export default toNewPatientData;