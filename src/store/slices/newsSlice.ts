import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getNews } from '../thunks/news'
import type { RootState } from '../store'
import type { NewsType } from '../../types/news'

type SliceNewsType = {
  hasError: boolean
  isLoading: boolean
  searchString: string
  news: NewsType[] | []
}

const initialState: SliceNewsType = {
  hasError: false,
  isLoading: true,
  searchString: '',
  news: [],
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      return { ...state, searchString: action.payload }
    },
  },
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
        const uniqueNews = [...state.news, ...action.payload].filter(
          (item, index, array) =>
            index === array.findIndex((obj) => obj.id === item.id)
        )
        return {
          searchString: '',
          hasError: false,
          isLoading: false,
          news: uniqueNews,
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
export const { setFilter } = newsSlice.actions
export default newsSlice.reducer
