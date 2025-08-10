import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../axios'
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
export const getNews = createAsyncThunk('news', async (url?: string | null) => {
  // await delay(1000) //
  const response = await api.get(url ?? 'v4/articles/?offset=0&limit=9')
  return response.data
})
