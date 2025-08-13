import styles from './loading.module.scss'

export function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.content}>
        <p className={styles.text}>Loading</p>
        <div className={styles.spinner} />
      </div>
    </div>
  )
}
