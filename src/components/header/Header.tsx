import styles from './header.module.scss'
import { Input } from '../input/input'
import logo from '../../assets/logo.png'
import { useAppDispatch } from '../../store/store'
import { setFilterByValue } from '../../store/slices/newsSlice'
import { useEffect, useState } from 'react'
import { Button } from '../button/button'

export function Header() {
  const [isSearch, setIsSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (searchValue.length === 0) {
      setIsSearch(false)
    }
  }, [searchValue])

  const dispatch = useAppDispatch()

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const trimmedSearchString = event.target.value.toLowerCase().trim()
    setSearchValue(event.target.value)
    setIsSearch(true)
    dispatch(setFilterByValue(trimmedSearchString))
  }

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
                value={searchValue}
                id={'search'}
                classNames={{ base: styles.inputBase, input: styles.input }}
                handleOnChange={handleOnChange}
                configuration={{ placeholder: 'Search' }}
              />
              {isSearch ? (
                <Button
                  handleOnClick={() => {
                    dispatch(setFilterByValue(''))
                    setSearchValue('')
                    setIsSearch(false)
                  }}
                  classNames={{ button: styles.closeSearchAction }}
                  content={''}
                />
              ) : (
                <Button
                  handleOnClick={() => {
                    setIsSearch(true)
                  }}
                  classNames={{ button: styles.searchAction }}
                  content={''}
                />
              )}
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
