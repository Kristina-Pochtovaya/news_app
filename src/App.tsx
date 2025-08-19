import { Navigate, Route, Routes } from 'react-router'
import styles from './app.module.scss'
import { Header } from './components/header/header'
import { OneNews } from './pages/one_news/one_news'
import { News } from './pages/news/news'

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/news" replace />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<OneNews />} />
      </Routes>
    </div>
  )
}
export default App
