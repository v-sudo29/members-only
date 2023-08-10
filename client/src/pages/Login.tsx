import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Heading,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react"
import { Form } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const auth = useAuth()
  const { setAuthUser, setIsLoggedIn } = auth

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (usernameRef.current && passwordRef.current) {
      const payload = {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }
      axios.post('http://localhost:3000/login', payload, { withCredentials: true })
        .then(result => {
          if (result.data !== 'Invalid credentials') {
            setAuthUser(result.data)
            setIsLoggedIn(true)
            navigate('/')
          }
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <VStack>
      <Heading>Login</Heading>
      <Form onSubmit={(e) => handleSubmit(e)} style={{ width: '20rem'}}>
        <FormLabel mt='1rem'>Username</FormLabel>
        <Input 
          ref={usernameRef}
          type='text'
          placeholder='Username'
        />
        <FormLabel mt='1rem'>Password</FormLabel>
        <Input 
          ref={passwordRef}
          type='password' 
          placeholder='Password' 
          autoComplete='on'
        />
        <Button type='submit' w='100%' mt='1rem'>Log in</Button>
      </Form>
    </VStack>
  )
}
