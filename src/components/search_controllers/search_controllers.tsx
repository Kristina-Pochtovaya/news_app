import styles from './search_controllers.module.scss'
import { Button } from '../button/button'
import { useAppDispatch } from '../../store/store'
import { useEffect, useState } from 'react'
import { DEFAULT_DELAY, useDebounce } from '../../helpers/debounce'
import { getNews } from '../../store/thunks/news'
import { Input } from '../input/input'

export function SearchControllers() {
  const [isSearch, setIsSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const debouncedGetNews = useDebounce((search: string) => {
    dispatch(getNews({ search: search || undefined }))
  }, DEFAULT_DELAY)

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
    debouncedGetNews(trimmedSearchString)
  }

  return (
    <div className={styles.searchControllers}>
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
            dispatch(getNews({ search: undefined }))
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
  )
}
