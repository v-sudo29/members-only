import { 
  Box,
  Button,
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
  Textarea,
  useDisclosure
} from "@chakra-ui/react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Message from "../interfaces/message"
import MessageCard from "../components/MessageCard"

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
      .then(() => {
        setIsLoggedIn(false)
        setAuthUser(null)
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

  if (messages) messageCards = messages.map((message, index) => {
    const userMatch = message.username === authUser?.username
    return (
      <MessageCard
        key={message.id}
        message={message}
        index={index}
        userMatch={userMatch}
        handleDeleteMessage={handleDeleteMessage}
      />
    )
  })

  return (
    <Box h='45rem'>
      <Heading fontWeight='300'>Welcome back 
        <span 
          style={{
            fontSize: '2.5rem',
            fontWeight: '500',
            marginLeft: '0.5rem'
          }}
        >
          {authUser && authUser.username}
        </span>
      </Heading>
      <Stack
        h='100%'
        mt='1rem'
        p='1rem'
        boxShadow='base'
      >
        <HStack flexWrap='wrap' gap='1rem'>
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

