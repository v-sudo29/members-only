import { NavLink } from "react-router-dom"

export default function Header() {

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      padding: '2rem'
    }}>
      <NavLink to='/'>Home</NavLink>      
      <NavLink to='/login'>Login</NavLink>      
      <NavLink to='/sign-up'>Sign Up</NavLink>
    </nav>
  )
}
