import { Routes } from 'react-router'
import styles from './app.module.scss'
import { Header } from './components/header/Header'

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Routes></Routes>
    </div>
  )
}
export default App
