import { useEffect, useState } from 'react'
import styles from './news.module.scss'
import { getNews } from '../../../store/thunks/news'
import { useSelector } from 'react-redux'
import { selectNews } from '../../../store/slices/newsSlice'
import { useAppDispatch } from '../../../store/store'
import { lifeTimeOptions, updateTimeOptions } from '../../common/options'
import Select from 'react-select'
import { Card } from '../../card/Card'
import { Button } from '../../button/button'
import type { NewsType } from '../../../types/news'

export function News() {
  const [filteredNews, setFilteredNews] = useState<NewsType[]>([])
  const dispatch = useAppDispatch()
  const news = useSelector(selectNews)

  useEffect(() => {
    dispatch(getNews())
  }, [dispatch])

  useEffect(() => {
    const filteredArray = news.news.filter((oneNews) => {
      return (
        oneNews.title.toLowerCase().includes(news.searchString) ||
        oneNews.authors.some((author) =>
          author.name.toLowerCase().includes(news.searchString)
        )
      )
    })
    setFilteredNews(filteredArray)
  }, [news.news.length, news.searchString])

  return (
    <div className={styles.news}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.header_actions}>
            <Select
              className={styles.select_lifeTime}
              classNamePrefix="life-time"
              value={lifeTimeOptions[0]}
              onChange={() => {}}
              options={lifeTimeOptions}
              isSearchable={false}
            />
            <Select
              className={styles.select_updateTime}
              classNamePrefix="update-time"
              value={updateTimeOptions[0]}
              onChange={() => {}}
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
            <Button handleOnClick={() => {}} content={'LoadPrev'} />
            <Button handleOnClick={() => {}} content={'LoadNext'} />
          </div>
        </div>
      </div>
    </div>
  )
}
