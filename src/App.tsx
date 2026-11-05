import './App.css'
import DebounceSearchDemo from './components/DebounceSearchDemo'
import PaginationDemo from './components/PaginationDemo'
import { styles } from './styles/styles'

function App() {

  return (
    <div className={styles.app}>
     <h1 className="text-5xl">Custom Hooks</h1>

     <PaginationDemo />

     <DebounceSearchDemo />
    </div>
  )
}

export default App
