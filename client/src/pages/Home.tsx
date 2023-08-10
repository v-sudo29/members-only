import { 
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  VStack,
  useDisclosure
} from "@chakra-ui/react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

interface Message {
  message: string,
  username: string,
  id: string
}

export default function Home() {
  const auth = useAuth()
  const navigate = useNavigate()
  const { authUser, setAuthUser, setIsLoggedIn } = auth
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [messages, setMessages] = useState<Message[]>()
  const messageRef = useRef<HTMLTextAreaElement | null>(null)
  const initialRef = useRef<HTMLTextAreaElement | null>(null)

  // Get messages at every initial render
  useEffect(() => {
    axios.get('http://localhost:3000/message/all', { withCredentials: true })
      .then(result => setMessages(result.data))
      .catch(err => console.log(err))
  }, [])

  // Handles logging out
  const handleLogout = () => {
    axios.get('http://localhost:3000/logout', { withCredentials: true })
      .then(result => {
        setIsLoggedIn(false)
        setAuthUser(null)
        console.log(result)
      })
      .catch(err => console.log(err))
  }

  // Handles creating message
  const handleCreateMessage = () => {
    if (messageRef.current) {
      axios.post('http://localhost:3000/message/create', { message: messageRef.current.value },
      { withCredentials: true })
        .then(result => console.log(result))
        .catch(err => console.log(err))
      onClose()
      navigate(0)
    }
  }

  // Handle deleting message
  const handleDeleteMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (messages) {
      const buttonElement = e.target as HTMLButtonElement
      const index = parseInt((buttonElement.parentNode?.parentNode as HTMLElement).id.split('-')[1])
      const messageId = messages[index].id
      const payload = { messageId: messageId }

      axios.delete('http://localhost:3000/message/delete', { data: payload })
        .then(result => {
          console.log(result)
          navigate(0)
        })
        .catch(err => console.error(err))
    }

  }

  let messageCards: (JSX.Element[] | null) = null
  console.log(messages)
  if (messages) messageCards = messages.map((message, index) => {
    const userMatch = message.username === authUser?.username

    return (
      <Card
        key={message.id}
        id={`message-${index}`}
        textAlign='start' 
        w='13rem'
        h='12rem'
        p='2rem'
      >
        <VStack gap='2rem' justify='space-between'>
          {userMatch && 
            <Button 
              onClick={(e) => handleDeleteMessage(e)}
              pos='relative'
              bottom='1.3rem'
              left='4.8rem'
              mb='-4rem'
              borderRadius='2rem'
              size='xs'
              bg='gray.200'
            >
              X
            </Button>
          }
          <Text>{message.message}</Text>
          <Text alignSelf='end' fontSize='0.9rem' textAlign='end'> {message.username}</Text>
        </VStack>
      </Card>
    )
  })

  return (
    <Box h='45rem'>
      <Heading>Hello {authUser && authUser.username}</Heading>
      <Stack
        h='100%'
        mt='1rem'
        p='1rem'
        boxShadow='base'
      >
        <HStack gap='1rem'>
          {messageCards && messageCards}
        </HStack>
      </Stack>
      <Button onClick={handleLogout} ml='1rem' mt='1rem'>Log Out</Button>
      <Button onClick={onOpen} ml='1rem' mt='1rem'>Create Message</Button>
      
      {/* MODAL */}
      <Modal 
        initialFocusRef={initialRef}
        isOpen={isOpen} 
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea 
              ref={(el: HTMLTextAreaElement) => {
                messageRef.current = el;  initialRef.current = el
              }} 
              resize='none' 
              rows={10}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleCreateMessage} variant='ghost'>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

