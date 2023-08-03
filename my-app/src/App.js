import React from 'react';
import {useState,useRef} from 'react'
import { saveAs } from 'file-saver';
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
  Image,
  Center,
  AspectRatio,
  Input,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
// import ImageUpload from './ImageUpload';


function App() {

  const inputRef = useRef(null);
    const [image, setImage] = useState('');

  function handleImage(e){
        console.log(e.target.file);
        setImage(e.target.files[0]);
  }

  //function for saving file



  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" m={5}>
        <Text fontSize='4xl'>Serverless Image Processor</Text>
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
          <GridItem  w='100%' h='10' >
              <Input 
              p={1}
              _placeholder={{ opacity: 1, color: 'black' }}
              placeholder={"hi"}
              borderRadius='md' 
              border='1px' 
              border-color='black.200' 
              type='file'
              name='file' 
              // ref={inputRef} 
              onChange={handleImage}></Input>
          </GridItem>
          <GridItem w='100%' h='10' bg='blue.400' borderRadius='md' border='1px' >
            <Button w='100%' h='10' bg='blue.400' borderRadius='md' border='1px' >
              {/* <Text>Download</Text> */}
               {
                  image?(
                    <Link w='100%' href={URL.createObjectURL(image)} download>Click to download</Link>
                      

                  ): <Link>
                  No Image
                  
                  </Link>
              }
              {/* <a href={URL.createObjectURL(image)} download>Click to download</a> */}
            </Button>
          </GridItem>
        </Grid>
      </Box>
       <Center m={5} alignItems='center' >
            <Box w='100%'>
              {
                  image?(
                      <AspectRatio maxW='600px' ratio={6/4}>
                          <Image src={URL.createObjectURL(image)}></Image>
                      </AspectRatio>

                  ): <img src='./logo.svg'></img>
              }
            </Box>
                    <Box>
          <Button m={5} bg='orange'>Invert</Button>
          <Button m={5} bg='orange'>Flip Horizontal</Button>
          <Button m={5} bg='orange'>Flip Vertical</Button>
      


          <Button m={5} bg='orange'>Decrase Brightness</Button>
          <Button m={5} bg='orange'>Increase Brightness</Button>
          <Button m={5} bg='orange'>Sepia Filter</Button>


          <Button m={5} bg='orange'>Pixelate</Button>
          <Button m={5} bg='orange'>Binarize</Button>
        </Box>
            
        </Center>

     
    </ChakraProvider>
  );
}

export default App;
