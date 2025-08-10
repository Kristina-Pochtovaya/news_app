import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getNews } from '../thunks/news'
import type { RootState } from '../store'
import type { NewsType } from '../../types/news'
import type {
  lifeTimeOptionsKeys,
  updateTimeOptionsKeys,
} from '../../components/common/options'

export type SliceNewsType = {
  hasError: boolean
  isLoading: boolean
  searchString: string
  filterByCreateDate?: keyof typeof lifeTimeOptionsKeys
  filterByEditDate?: keyof typeof updateTimeOptionsKeys
  count: number
  next: string | null
  previous: string | null
  results: NewsType[] | []
}

const initialState: SliceNewsType = {
  hasError: false,
  isLoading: true,
  searchString: '',
  count: 0,
  next: null,
  previous: null,
  filterByCreateDate: undefined,
  filterByEditDate: undefined,
  results: [],
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setFilterByValue: (state, action: PayloadAction<string>) => {
      return { ...state, searchString: action.payload }
    },
    setFilterByCreateDate: (
      state,
      action: PayloadAction<keyof typeof lifeTimeOptionsKeys | undefined>
    ) => {
      return { ...state, filterByCreateDate: action.payload }
    },
    setFilterByEditDate: (
      state,
      action: PayloadAction<keyof typeof updateTimeOptionsKeys | undefined>
    ) => {
      return { ...state, filterByEditDate: action.payload }
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
      (_, action: PayloadAction<SliceNewsType>) => {
        console.log(action.payload.results, 'action.payload ')
        // const uniqueNews = action.payload.results.filter(
        //   (item, index, array) =>
        //     index === array.findIndex((obj) => obj.id === item.id)
        // )
        return {
          searchString: '',
          hasError: false,
          isLoading: false,
          count: action.payload.count,
          previous: action.payload.previous,
          next: action.payload.next,
          results: action.payload.results,
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
export const selectNext = (state: RootState) => state.news.next
export const selectPrevious = (state: RootState) => state.news.previous
export const { setFilterByValue, setFilterByCreateDate, setFilterByEditDate } =
  newsSlice.actions
export default newsSlice.reducer
