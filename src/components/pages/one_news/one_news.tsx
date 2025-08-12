import { useEffect } from 'react'
import styles from './one_news.module.scss'
import { useAppDispatch } from '../../../store/store'
import { getOneNews } from '../../../store/thunks/one_news'
import { selectOneNews } from '../../../store/slices/one_news_slice'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router'
import { formatDate } from '../../../helpers/format_date'

export type OneNewsProps = {
  id: number
}

export function OneNews() {
  const { oneNews } = useSelector(selectOneNews)
  const dispatch = useAppDispatch()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(getOneNews(id))
    }
  }, [id, dispatch])

  if (!oneNews) {
    return
  }
  return (
    <div className={styles.oneNews}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p>{oneNews.title}</p>
        </div>
        <div className={styles.content}>
          <div className={styles.generalInfo}>
            <ul className={styles.authors}>
              {oneNews?.authors.map((author, index) => (
                <li>
                  {author.name}
                  {index !== oneNews.authors.length - 1 ? ',' : ''}
                </li>
              ))}
            </ul>
            <p>{formatDate(oneNews.published_at)}</p>
          </div>
          <div className={styles.image}>
            <img src={oneNews.image_url} alt={oneNews.title} />
          </div>
          <div className={styles.description}>
            <p>{oneNews.summary}</p>
          </div>
        </div>
        <NavLink className={styles.footer} to="/news">
          Go to site
        </NavLink>
      </div>
    </div>
  )
}
