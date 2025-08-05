import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.spaceflightnewsapi.net/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})
