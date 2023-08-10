import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Heading,
  FormLabel,
  Input,
  Text,
  VStack
} from "@chakra-ui/react"
import { Form } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)
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
            setInvalidCredentials(false)
            setAuthUser(result.data)
            setIsLoggedIn(true)
            navigate('/')
          }
        })
        .catch(err => {
          console.error(err)
          if (err.response.status === 401) setInvalidCredentials(true)
        })
    }
  }

  return (
    <VStack>
      <Heading>Login</Heading>
      {invalidCredentials && 
        <Text 
          pos='absolute'
          color='red.500'
          top='8.5rem'
          fontWeight='500'
        >
          Invalid username or password. Please try again.
        </Text>
      }
      <Form onSubmit={(e) => handleSubmit(e)} style={{ width: '20rem'}}>
        <FormLabel mt='2rem'>Username</FormLabel>
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
