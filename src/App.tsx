import './App.css'
import UsStockCalculator from './features/us-stock-calculator.tsx'
import { Title } from './features/us-stock-calculator.tsx/components/Title.tsx'
import { SupportChatWidget } from './features/shared/SupportChatWidget.tsx'
import { Footer } from './features/shared/Footer.tsx'

function App() {

  return (
    <div className='bg-slate-950 text-slate-100'>
      <Title />
      <UsStockCalculator />
      <SupportChatWidget />
      <Footer />
    </div>
  )
}

export default App
