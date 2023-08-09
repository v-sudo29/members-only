import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

export default function Header() {
  const authUser = useAuth()
  const { isLoggedIn, setIsLoggedIn, setAuthUser } = authUser

  const handleLogout = () => {
    axios.get('http://localhost:3000/logout', { withCredentials: true })
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
      <NavLink to='/'>Home</NavLink>
      {!isLoggedIn && (
        <>
          <NavLink to='/login'>Login</NavLink>      
          <NavLink to='/sign-up'>Sign Up</NavLink>
        </>
      )}
      {isLoggedIn && <NavLink onClick={handleLogout} to='/'>Logout</NavLink> } 
    </nav>
  )
}
