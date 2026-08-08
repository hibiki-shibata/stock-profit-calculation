import './App.css'
import UsStockCalculator from './features/us-stock-calculator.tsx'
import Title from './features/shared/Title.tsx'
import SupportChatWidget from './features/shared/SupportChatWidget.tsx'

function App() {

  return (
    <div>
      <Title />
      <UsStockCalculator />
      <SupportChatWidget />
    </div>
  )
}

export default App
