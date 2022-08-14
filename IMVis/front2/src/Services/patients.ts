import axios from 'axios';
import { Patient } from '../types';

const apiUrl = 'http://localhost:3003/api/patients'

const getAll = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
}

export default { getAll };