import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getNews } from '../thunks/news'
import type { RootState } from '../store'
import type { NewsType } from '../../types/news'
import { getOneNews } from '../thunks/oneNews'

type SliceNewsType = {
  hasError: boolean
  isLoading: boolean
  oneNews?: NewsType
}

const initialState: SliceNewsType = {
  hasError: false,
  isLoading: true,
  oneNews: undefined,
}

export const oneNewsSlice = createSlice({
  name: 'oneNews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneNews.pending, (state, _) => {
      return {
        ...state,
        hasError: false,
        isLoading: true,
      }
    })
    builder.addCase(
      getOneNews.fulfilled,
      (state, action: PayloadAction<NewsType>) => {
        return {
          hasError: false,
          isLoading: false,
          news: { ...state.oneNews, ...action.payload },
        }
      }
    )
    builder.addCase(getOneNews.rejected, (state, _) => {
      return {
        ...state,
        hasError: true,
        isLoading: false,
      }
    })
  },
})

export const selectOneNews = (state: RootState) => state.oneNews

export default oneNewsSlice.reducer
