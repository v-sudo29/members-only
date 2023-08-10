import { Button, Card, Text, VStack } from "@chakra-ui/react";
import Message from "../interfaces/message";

export default function MessageCard(
  { message,
    index, 
    userMatch,
    handleDeleteMessage
  } : 
  { message: Message,
    index: number,
    userMatch: boolean,
    handleDeleteMessage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  }
) {
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
}
