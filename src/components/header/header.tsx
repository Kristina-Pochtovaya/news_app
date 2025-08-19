import styles from './header.module.scss'

import logo from '../../assets/logo.png'
import { SearchControllers } from '../search_controllers/search_controllers'
import { NavLink } from 'react-router'

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <NavLink className={styles.logo} to="/news">
              <div className={styles.logo_image}>
                <img src={logo} alt="logo" />
              </div>
              <div className={styles.logo_name}>
                <p>Meta</p>
                <p className={styles.logo_name__highlighted}>Blog</p>
              </div>
            </NavLink>
            <SearchControllers />
          </div>
          <div className={styles.title}>
            <p>News Blog</p>
          </div>
        </div>
      </div>
    </div>
  )
}
