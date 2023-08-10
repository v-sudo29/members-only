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
        minW='13rem'
        maxW='13rem'
        h='12rem'
        p='2.5rem 1.5rem'
      >
        <VStack gap='2rem' h='100%' justify='space-between'>
          {userMatch && 
            <Button 
              onClick={(e) => handleDeleteMessage(e)}
              pos='relative'
              bottom='1.9rem'
              left='5rem'
              mb='-4rem'
              borderRadius='2rem'
              size='xs'
              bg='gray.100'
              fontSize='0.6rem'
            >
              X
            </Button>
          }
          <Text>{message.message}</Text>
          <Text 
            alignSelf='end'
            fontSize='0.9rem' 
            fontWeight='600'
            textAlign='end'
          > 
            {message.username}
          </Text>
        </VStack>
      </Card>
  )
}
