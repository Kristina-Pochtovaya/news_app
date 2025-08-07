import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../axios'

export const getNews = createAsyncThunk('news', async () => {
  const response = await api.get('v4/articles/?limit=9')

  return response.data.results
})
