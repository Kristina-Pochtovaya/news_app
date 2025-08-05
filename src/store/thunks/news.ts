import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../axios'

export const getNews = createAsyncThunk('product', async () => {
  const response = await api.get('v4/articles/')

  return response.data.results
})
