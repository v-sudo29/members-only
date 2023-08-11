import { useRef } from "react"
import {
  Button,
  Heading,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react"
import { Form, useNavigate } from "react-router-dom"
import axiosConfig from '../axiosConfig'

export default function SignUp() {
  const firstNameRef = useRef<HTMLInputElement | null>(null)
  const lastNameRef = useRef<HTMLInputElement | null>(null)
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (firstNameRef.current && lastNameRef.current && usernameRef.current && passwordRef.current) {
      // Check if first name is empty
      if (firstNameRef.current.value.length === 0) {
        alert('Cannot leave first name empty')
        return
      }
      if (lastNameRef.current.value.length === 0) {
        alert('Cannot leave last name empty')
        return
      }
      if (usernameRef.current.value.length < 3) {
        alert('Username must be at least 3 characters long')
        return
      }
      if (passwordRef.current.value.length < 3) {
        alert('Password must be at least 3 characters long')
        return
      }

      const payload = {
        fullName: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        membershipStatus: false
      }
      axiosConfig.post('http://localhost:3000/sign-up', payload)
        .then(() => {
          navigate('/')
          alert('Successfully signed up!')
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <VStack>
      <Heading>Sign Up</Heading>
      <Form style={{ width: '20rem'}}>
        <FormLabel>First Name</FormLabel>
        <Input 
          ref={firstNameRef} 
          type='text' 
          placeholder='First Name'
        />
        <FormLabel mt='1rem'>Last Name</FormLabel>
        <Input 
          ref={lastNameRef}
          type='text'
          placeholder='Last Name'
        />
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
        <Button onClick={handleSubmit} w='100%' mt='1rem'>Sign up</Button>
      </Form>
    </VStack>
  )
}
