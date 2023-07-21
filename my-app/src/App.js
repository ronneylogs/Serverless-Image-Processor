import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid, GridItem,
  Button, ButtonGroup,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import ImageUpload from './ImageUpload';

function App() {
  return (
    <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl" m={5}>
      <Text fontSize='4xl'>Serverless Image Processor</Text>
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        <GridItem  w='100%' h='10' >
          <Button borderRadius='md' border='1px' border-color='black.200' bg='gray.200' size='md' w='100%'>
            <Text fontSize='2xl'>Select a photo</Text>
          </Button>
        </GridItem>
        <GridItem w='100%' h='10' bg='black' />
      </Grid>
    </Box>
     <ImageUpload></ImageUpload>
    </ChakraProvider>
  );
}

export default App;
