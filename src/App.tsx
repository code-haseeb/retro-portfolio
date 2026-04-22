import { Navigate, Route, Routes } from 'react-router-dom'
import { PacmanCursorFollower } from './components/chrome/PacmanCursorFollower.tsx'
import { SeoManager } from './components/seo/SeoManager.tsx'
import { ContactPage } from './pages/ContactPage.tsx'
import { ExperiencePage } from './pages/ExperiencePage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { IntroPage } from './pages/IntroPage.tsx'
import { MenuPage } from './pages/MenuPage.tsx'
import { ProjectDetailPage } from './pages/ProjectDetailPage.tsx'
import { ProjectsPage } from './pages/ProjectsPage.tsx'

function App() {
  return (
    <>
      <SeoManager />
      <PacmanCursorFollower />
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
