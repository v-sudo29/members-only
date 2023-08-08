import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'
import Layout from './components/Layout'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>} />
      <Route path='/sign-up' element={<SignUp/>} />
    </Route>
  )
)

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router}/>
    </ChakraProvider>
  )
}

export default App
