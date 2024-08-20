

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Boss from './pages/Boss'
import Førerkort from './pages/førerkort'
import Kontroll from './pages/kontroll'
import Onboarding from './pages/Onboarding'
import GlobalLayout from './pages/GlobalLayout'

import './global.css'
import Contact from './pages/Contact'
function App() {
  
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GlobalLayout />}>
          <Route index element={ <Landing />}/>
          <Route path='boss' element={ <Boss />}/>
          <Route path='f' element={ <Førerkort interactive data={undefined} />}/>
          <Route path='k' element={ <Kontroll />}/>
          <Route path='onboarding' element={ <Onboarding  />}/>
          <Route path='contact' element={ <Contact  />}/>
          <Route path="*" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
