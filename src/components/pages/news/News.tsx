import { useEffect } from 'react'
import styles from './news.module.scss'
import { getNews } from '../../../store/thunks/news'
import { useSelector } from 'react-redux'
import { selectNews } from '../../../store/slices/newsSlice'
import { useAppDispatch } from '../../../store/store'
import { lifeTimeOptions, updateTimeOptions } from '../../common/options'
import Select from 'react-select'

export function News() {
  const dispatch = useAppDispatch()
  const news = useSelector(selectNews)

  useEffect(() => {
    dispatch(getNews())
  }, [dispatch])

  useEffect(() => {
    console.log(news, 'newsdff')
  }, [news])

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
        <div className={styles.content}>card</div>
        <div className={styles.footer}>
          <div className={styles.footer_actions}></div>
        </div>
      </div>
    </div>
  )
}
