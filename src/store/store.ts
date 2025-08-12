import { configureStore } from '@reduxjs/toolkit'
import newsSlice from './slices/news_slice'
import { useDispatch } from 'react-redux'
import oneNewsSlice from './slices/one_news_slice'

export const store = configureStore({
  reducer: {
    news: newsSlice,
    oneNews: oneNewsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
