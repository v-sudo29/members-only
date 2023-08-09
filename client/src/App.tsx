import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import './App.css'
import { AuthProvider } from './context/AuthContext'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>} />
      <Route path='login' element={<Login/>} />
      <Route path='sign-up' element={<SignUp/>} />
    </Route>
  )
)

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
