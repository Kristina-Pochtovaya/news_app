import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../axios'

export type getNewsProps = {
  newUrl?: string | null
  search?: string
  ordering?: string
}
export const getNews = createAsyncThunk(
  'news',
  async ({ newUrl, search, ordering }: getNewsProps) => {
    const url =
      newUrl ??
      `v4/articles/?offset=0&limit=9${ordering ? `&ordering=${ordering}` : ''}${
        search ? `&search=${search}` : ''
      }`
    const response = await api.get(url)
    return response.data
  }
)
