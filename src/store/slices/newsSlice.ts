import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getNews } from '../thunks/news'
import type { RootState } from '../store'
import type { NewsType } from '../../types/news'
import type {
  lifeTimeOptionsKeys,
  updateTimeOptionsKeys,
} from '../../components/common/options'

type SliceNewsType = {
  hasError: boolean
  isLoading: boolean
  searchString: string
  filterByCreateDate?: keyof typeof lifeTimeOptionsKeys
  filterByEditDate?: keyof typeof updateTimeOptionsKeys
  news: NewsType[] | []
}

const initialState: SliceNewsType = {
  hasError: false,
  isLoading: true,
  searchString: '',
  filterByCreateDate: undefined,
  filterByEditDate: undefined,
  news: [],
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
export const { setFilterByValue, setFilterByCreateDate, setFilterByEditDate } =
  newsSlice.actions
export default newsSlice.reducer
