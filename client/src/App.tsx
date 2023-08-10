import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const authInfo = useAuth()
  const { authUser, authIsReady } = authInfo

  const loadingStyles = {
    backgroundColor: '#dededeaa',
    width: '100vw',
    height: '100vh'
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout/>}>
            <Route index element={
              <>
              {!authUser && <Navigate to='/login' />}
              {authUser && <Home/>}          
              </>
            } />
            <Route path='/login' element={
              <>
              {!authUser && <Login/>}
              {authUser && <Navigate to='/' />}
              </>
            } />
            <Route path='/sign-up' element={
              <>
              {!authUser && <SignUp/>}          
              {authUser && <Navigate to='/' />}
              </>
            } />
          </Route>
      </>
    )
  )

  return (
    <>
      {!authIsReady && <div style={loadingStyles}></div>}

      {authIsReady && <RouterProvider router={router}/>}
    </>
  )

}

export default App

