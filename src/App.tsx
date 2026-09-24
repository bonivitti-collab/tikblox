import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import OnboardingModal from './components/OnboardingModal'
import { useOnboarding } from './hooks/useOnboarding'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CalculatorPage from './pages/CalculatorPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const { onboardingConcluido, concluirOnboarding } = useOnboarding()
  const location = useLocation()

  return (
    <>
      {!onboardingConcluido && <OnboardingModal onConcluir={concluirOnboarding} />}
      <Layout>
        <Routes>
          <Route path="/" element={<ProductsPage preset="todos" />} />
          <Route path="/ondas-iniciais" element={<ProductsPage preset="ondas-iniciais" />} />
          <Route path="/alta-margem" element={<ProductsPage preset="alta-margem" />} />
          <Route path="/favoritos" element={<ProductsPage preset="favoritos" />} />
          <Route path="/calculadora" element={<CalculatorPage key={location.key} />} />
          <Route path="/produto/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
