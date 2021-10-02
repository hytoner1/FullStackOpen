import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (content) => {
  return {
    content: content,
    id: getId(),
    votes: 0
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (text) => {
  console.log('createNew', text);
  const object = asObject(text);
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async (id, newObj) => {
  const res = await axios.put(baseUrl + '/' + id, newObj);
  return res.data;
};

export default {getAll, createNew, update};