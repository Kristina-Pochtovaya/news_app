import { useEffect, useState } from 'react'
import styles from './news.module.scss'
import { getNews } from '../../../store/thunks/news'
import { useSelector } from 'react-redux'
import {
  selectNews,
  selectNext,
  selectPrevious,
} from '../../../store/slices/news_slice'
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
import { Card } from '../../card/сard'
import { Button } from '../../button/button'

export function News() {
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
    dispatch(getNews({ newUrl: null }))
  }, [dispatch])

  function handleOnChangeLifeTimeOption(
    newValue: SingleValue<SelectLifeTimeOptionType>
  ) {
    if (!newValue?.value) {
      return
    }
    setLifeTimeOption(newValue)
    setUpdateTimeOption(undefined)
    const ordering =
      newValue?.value === lifeTimeOptionsKeys.newest
        ? '-published_at'
        : 'published_at'
    dispatch(getNews({ ordering }))
  }

  function handleOnChangeUpdateTimeOption(
    newValue: SingleValue<SelectUpdateTimeOptionType>
  ) {
    if (!newValue?.value) {
      return
    }
    setLifeTimeOption(undefined)
    setUpdateTimeOption(newValue)
    const ordering =
      newValue?.value === updateTimeOptionsKeys.freshData
        ? '-updated_at'
        : 'updated_at'
    dispatch(getNews({ ordering }))
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
          {news.results?.map((oneNews) => (
            <Card key={oneNews.id} news={oneNews} />
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.footer_actions}>
            <Button
              disabled={!previous}
              handleOnClick={() => {
                dispatch(getNews({ newUrl: previous }))
              }}
              content={'LoadPrev'}
            />
            <Button
              disabled={!next}
              handleOnClick={() => {
                dispatch(getNews({ newUrl: next }))
              }}
              content={'LoadNext'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
