import { Button, Heading } from "@chakra-ui/react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

export default function Home() {
  const auth = useAuth()
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = auth

  const handleGetInfo = () => {
    axios.get('http://localhost:3000/user', { withCredentials: true })
      .then(result => {
        if (result.data == 'No user logged in') console.log('No user logged in')
        else console.log('User is logged in!')
      })
      .catch(err => console.log(err))
  }

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
    <div>
      <Heading>Homepage</Heading>
      { authUser && (
        <Heading 
          fontSize='1.4rem' 
          fontWeight='400'
          mt='1rem'
          >
            Hello {authUser.username} 
          </Heading> 
      )}
      <Button onClick={handleGetInfo} mt='1rem'>Get User Info</Button>
      { isLoggedIn && <Button onClick={handleLogout} ml='1rem' mt='1rem'>Log Out</Button> }
    </div>
  )
}

