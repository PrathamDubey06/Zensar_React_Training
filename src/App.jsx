import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Planner from './pages/Planner'
import Progress from './pages/Progress'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Layout>
  )
}

export default App
