import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Loader from './_components/loader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full h-full min-h-[90vh] text-red-500 flex items-center justify-center'>
     <Loader/>
    </div>
  )
}

export default App
