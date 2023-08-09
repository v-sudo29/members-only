import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useAuth } from './context/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'
import './App.css'

const routerNotLoggedIn = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>} />
      <Route path='login' element={<Login/>} />
      <Route path='sign-up' element={<SignUp/>} />
    </Route>
  )
)

const routerLoggedIn = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>} />
      <Route />
    </Route>
  )
)

function App() {
  const authInfo = useAuth()
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = authInfo

  useEffect(() => {
    if (!authUser) {
      axios.get('http://localhost:3000/checkAuth', { withCredentials: true })
      .then(result => {
        if (result.data !== 'User not logged in') {
          setAuthUser(result.data)
          setIsLoggedIn(true)
        }
      })
      .catch(err => console.log(err))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser])

  return (
    <RouterProvider router={ isLoggedIn ? routerLoggedIn : routerNotLoggedIn }/>
  )
}

export default App

