import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  return axios.get(baseUrl);
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
}

const update = (id, newObject) => {
  console.log('update: ', id, newObject);
  return axios.put(baseUrl + '/' + id, newObject);
}

const deleteEntry = (id) => {
  console.log('deleteEntry', id);
  return axios
    .delete(baseUrl + '/' + id);
}

const exports = { getAll, create, update, deleteEntry };
export default exports;