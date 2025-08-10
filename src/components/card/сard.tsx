import { useEffect } from 'react'
import styles from './card.module.scss'
import { useAppDispatch } from '../../store/store'
import { getOneNews } from '../../store/thunks/oneNews'
import type { NewsType } from '../../types/news'
import { formatDate } from '../../helpers/format_date'

export type CardProps = {
  news: NewsType
}

export function Card({ news }: CardProps) {
  const dispatch = useAppDispatch()
  // const oneNews = useSelector(selectOneNews)
  useEffect(() => {
    dispatch(getOneNews(news.id))
  }, [])

  // useEffect(() => {
  //   console.log(oneNews, 'fffffffffffffffff')
  // }, [oneNews])

  return (
    <div className={styles.card}>
      <div className={styles.cardWrapper}>
        <div className={styles.image}>
          <img src={news.image_url} alt={news.title} />
        </div>
        <div className={styles.title}>
          <p>{news.title}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.author}>
            {news.authors.map((author, index) => (
              <p key={index}>{author.name}</p>
            ))}
          </div>
          <div className={styles.date}>
            <p>{formatDate(news.updated_at)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
