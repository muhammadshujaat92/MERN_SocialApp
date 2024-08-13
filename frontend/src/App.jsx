import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from "./context/AuthProvider"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Feed from './components/Feed'
import { RequireAuth } from './context/RequireAuth'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/feed' element={<RequireAuth> <Feed /> </RequireAuth>} />
            <Route path='/signup' element={<Signup />} />
            {/* <Route path='*' element={}/> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      {/* <Navbar/> */}
      {/* <Signup/> */}
      {/* <Login/> */}
      {/* <Home/> */}
      {/* <Feed/> */}
    </>
  )
}

export default App
