import { useState } from 'react'
import './App.css'
import PaginationDemo from './components/PaginationDemo'
import { styles } from './styles/styles'

function App() {

  return (
    <div className={styles.app}>
     <h1 className="text-5xl">Custom Hooks</h1>

     <PaginationDemo />
    </div>
  )
}

export default App
