import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../axios'
import { useSelector } from 'react-redux'
import type { SliceNewsType } from '../slices/news_slice'

export type GetNewsProps = {
  newUrl?: string | null
}
export const getNews = createAsyncThunk<
  SliceNewsType,
  GetNewsProps | undefined
>('news', async (args = {}, thunkAPI) => {
  const { newUrl } = args
  const state = thunkAPI.getState() as { news: SliceNewsType }
  const { ordering, search } = state.news.filters

  console.log(ordering, 'ordering', search, 'search')
  const url =
    newUrl ??
    `v4/articles/?offset=0&limit=9${ordering ? `&ordering=${ordering}` : ''}${
      search ? `&search=${search}` : ''
    }`
  const response = await api.get(url)
  return response.data
})
