import 'dotenv/config';
import axios from 'axios';

const convoy = axios.create({
  baseURL: process.env.CONVOY_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.CONVOY_API_KEY}`,
  },
});

export default convoy;
