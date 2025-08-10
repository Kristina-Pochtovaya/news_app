import { useEffect, useState } from 'react'
import styles from './news.module.scss'
import { getNews } from '../../../store/thunks/news'
import { useSelector } from 'react-redux'
import {
  selectNews,
  setFilterByCreateDate,
  setFilterByEditDate,
  selectNext,
  selectPrevious,
} from '../../../store/slices/newsSlice'
import { useAppDispatch } from '../../../store/store'
import {
  lifeTimeOptions,
  lifeTimeOptionsKeys,
  updateTimeOptions,
  updateTimeOptionsKeys,
  type SelectLifeTimeOptionType,
  type SelectUpdateTimeOptionType,
} from '../../common/options'
import Select, { type SingleValue } from 'react-select'
// import Select, { type ActionMeta, type SingleValue } from 'react-select'
import { Card } from '../../card/сard'
import { Button } from '../../button/button'
import type { NewsType } from '../../../types/news'

export function sortDate<T>(
  filteredArray: NewsType[],
  currentFilterValue: T,
  valueToFilter: T
) {
  filteredArray.sort((firstNews, secondNews) => {
    if (currentFilterValue === valueToFilter) {
      return (
        new Date(firstNews.published_at).getTime() -
        new Date(secondNews.published_at).getTime()
      )
    }
    return (
      new Date(secondNews.published_at).getTime() -
      new Date(firstNews.published_at).getTime()
    )
  })
}

export function News() {
  const [filteredNews, setFilteredNews] = useState<NewsType[]>([])
  const [lifeTimeOption, setLifeTimeOption] = useState<
    SelectLifeTimeOptionType | undefined
  >(lifeTimeOptions[0])
  const [updateTimeOption, setUpdateTimeOption] = useState<
    SelectUpdateTimeOptionType | undefined
  >(updateTimeOptions[0])

  const dispatch = useAppDispatch()
  const news = useSelector(selectNews)
  const next = useSelector(selectNext)
  const previous = useSelector(selectPrevious)

  useEffect(() => {
    dispatch(getNews())
  }, [dispatch])

  useEffect(() => {
    console.log(news.results)
    let filteredArray = news.results.filter((oneNews) => {
      return (
        oneNews.title.toLowerCase().includes(news.searchString) ||
        oneNews.authors.some((author) =>
          author.name.toLowerCase().includes(news.searchString)
        )
      )
    })

    if (news.filterByCreateDate) {
      sortDate(
        filteredArray,
        news.filterByCreateDate,
        lifeTimeOptionsKeys.newest
      )
    }

    if (news.filterByEditDate) {
      sortDate(
        filteredArray,
        news.filterByEditDate,
        updateTimeOptionsKeys.freshData
      )
    }

    setFilteredNews(filteredArray)
    // console.log(filteredArray, 'filteredArray')
  }, [
    news.results,
    news.results.length,
    news.searchString,
    news.filterByCreateDate,
    news.filterByEditDate,
  ])

  function handleOnChangeLifeTimeOption(
    newValue: SingleValue<SelectLifeTimeOptionType>
    // actionMeta: ActionMeta<SelectLifeTimeOptionType>
  ) {
    if (!newValue?.value) {
      return
    }
    setLifeTimeOption(newValue)
    setUpdateTimeOption(undefined)
    dispatch(setFilterByCreateDate(newValue.value))
    dispatch(setFilterByEditDate(undefined))
  }

  function handleOnChangeUpdateTimeOption(
    newValue: SingleValue<SelectUpdateTimeOptionType>
    // actionMeta: ActionMeta<SelectUpdateTimeOptionType>
  ) {
    if (!newValue?.value) {
      return
    }
    setLifeTimeOption(undefined)
    dispatch(setFilterByCreateDate(undefined))
    setUpdateTimeOption(newValue)

    dispatch(setFilterByEditDate(newValue.value))
  }

  return (
    <div className={styles.news}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.header_actions}>
            <Select
              className={styles.select_lifeTime}
              classNamePrefix="life-time"
              value={lifeTimeOption}
              onChange={handleOnChangeLifeTimeOption}
              options={lifeTimeOptions}
              isSearchable={false}
            />
            <Select
              className={styles.select_updateTime}
              classNamePrefix="update-time"
              value={updateTimeOption}
              onChange={handleOnChangeUpdateTimeOption}
              options={updateTimeOptions}
              isSearchable={false}
            />
          </div>
        </div>
        <div className={styles.content}>
          {filteredNews?.map((oneNews) => (
            <Card key={oneNews.id} news={oneNews} />
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.footer_actions}>
            <Button
              disabled={!previous}
              handleOnClick={() => {
                dispatch(getNews(previous))
              }}
              content={'LoadPrev'}
            />
            <Button
              disabled={!next}
              handleOnClick={() => {
                dispatch(getNews(next))
              }}
              content={'LoadNext'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
