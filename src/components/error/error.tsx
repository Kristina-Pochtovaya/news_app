import styles from './error.module.scss'

export function Error() {
  return (
    <div className={styles.error}>
      <div className={styles.content}>
        <p className={styles.text}>
          Ops, someting went wrong. Please try later :(
        </p>
      </div>
    </div>
  )
}
