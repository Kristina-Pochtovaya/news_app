import styles from './search_controllers.module.scss'
import { Button } from '../button/button'
import { useAppDispatch } from '../../store/store'
import { useEffect, useState } from 'react'
import { DEFAULT_DELAY, useDebounce } from '../../helpers/debounce'
import { getNews } from '../../store/thunks/news'
import { Input } from '../input/input'
import { setFilters } from '../../store/slices/news_slice'

export function SearchControllers() {
  const [isSearch, setIsSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const debouncedGetNews = useDebounce((search: string) => {
    dispatch(setFilters({ search: search || undefined }))
    dispatch(getNews())
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
            dispatch(setFilters({ search: undefined }))
            dispatch(getNews())
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
