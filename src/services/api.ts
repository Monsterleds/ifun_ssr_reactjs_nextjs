import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3333',
  headers: { 'Access-Control-Allow-Origin': '*' },
});
