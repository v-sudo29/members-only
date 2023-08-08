import { useRef } from "react"
import {
  Button,
  Heading,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react"
import { Form } from "react-router-dom"
import axios from "axios"

export default function SignUp() {
  const firstNameRef = useRef<HTMLInputElement | null>(null)
  const lastNameRef = useRef<HTMLInputElement | null>(null)
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = () => {
    if (firstNameRef.current && lastNameRef.current && usernameRef.current && passwordRef.current) {
      const payload = {
        fullName: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        membershipStatus: false
      }
      axios.post('http://localhost:3000/sign-up', payload)
        .then(result => console.log(result))
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
