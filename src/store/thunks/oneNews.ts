import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../axios'

export const getOneNews = createAsyncThunk('oneNews', async (id: number) => {
  const response = await api.get(`v4/articles/${id}`)

  return response.data
})
