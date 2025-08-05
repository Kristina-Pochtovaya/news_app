import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getNews } from '../thunks/news'
import type { RootState } from '../store'
import type { NewsType } from '../../types/news'

type SliceNewsType = {
  hasError: boolean
  isLoading: boolean
  news: NewsType[] | []
}

const initialState: SliceNewsType = {
  hasError: false,
  isLoading: true,
  news: [],
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state, _) => {
      return {
        ...state,
        hasError: false,
        isLoading: true,
      }
    })
    builder.addCase(
      getNews.fulfilled,
      (state, action: PayloadAction<NewsType[]>) => {
        return {
          hasError: false,
          isLoading: false,
          news: [...state.news, ...action.payload],
        }
      }
    )
    builder.addCase(getNews.rejected, (state, _) => {
      return {
        ...state,
        hasError: true,
        isLoading: false,
      }
    })
  },
})

export const selectNews = (state: RootState) => state.news

export default newsSlice.reducer
