import styles from './header.module.scss'
import { Input } from '../input/input'
import logo from '../../assets/logo.png'

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.logo}>
              <div className={styles.logo_image}>
                <img src={logo} alt="logo" />
              </div>
              <div className={styles.logo_name}>
                <p>Meta</p>
                <p className={styles.logo_name__highlighted}>Blog</p>
              </div>
            </div>

            <div className={styles.search}>
              <Input
                classNames={{ base: styles.inputBase, input: styles.input }}
                onChange={undefined}
                configuration={{ placeholder: 'Search' }}
              />
            </div>
          </div>
          <div className={styles.title}>
            <p>News Blog</p>
          </div>
        </div>
      </div>
    </div>
  )
}
