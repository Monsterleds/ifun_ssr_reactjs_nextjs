import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3333',
  headers: {"Access-Control-Allow-Origin": "*", authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTQ2NjM1NjMsImV4cCI6MTU5NDc0OTk2Mywic3ViIjoiMWJmZjNkYTUtNzRiNy00NzQ2LWEwOGMtYjZkNTkxN2ZiNGQxIn0.JkEhR0JEi8Zg2m41Q5i1u10m0jbaoh15MwF1y8Pl0Us'}
})