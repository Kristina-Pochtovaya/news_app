import { Navigate, Route, Routes } from 'react-router'
import styles from './app.module.scss'
import { Header } from './components/header/Header'
import { News } from './components/pages/news/News'

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/news" replace />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </div>
  )
}
export default App
