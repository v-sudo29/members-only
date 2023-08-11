import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosConfig from '../axiosConfig'

export default function Header() {
  const authUser = useAuth()
  const { isLoggedIn, setIsLoggedIn, setAuthUser } = authUser

  const handleLogout = () => {
    axiosConfig.get('/logout', { withCredentials: true })
      .then(result => {
        setIsLoggedIn(false)
        setAuthUser(null)
        console.log(result)
      })
      .catch(err => console.log(err))
  }
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      padding: '2rem'
    }}>
      {!isLoggedIn && (
        <>
          <NavLink to='/'>Login</NavLink>      
          <NavLink to='/sign-up'>Sign Up</NavLink>
        </>
      )}
      {isLoggedIn && 
      <>
        <NavLink to='/'>Home</NavLink>
        <NavLink onClick={handleLogout} to='/'>Logout</NavLink> 
      </>
      } 
    </nav>
  )
}
