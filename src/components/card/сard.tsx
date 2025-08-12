import styles from './card.module.scss'

import type { NewsType } from '../../types/news'
import { formatDate } from '../../helpers/format_date'
import { useNavigate } from 'react-router'

export type CardProps = {
  news: NewsType
}

export function Card({ news }: CardProps) {
  const navigate = useNavigate()

  function handleOnClick() {
    navigate(`/news/${news.id}`)
  }

  return (
    <div className={styles.card} onClick={handleOnClick}>
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
