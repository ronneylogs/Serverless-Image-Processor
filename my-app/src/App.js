import React from 'react';
import {useState,useRef} from 'react'
import axios from "axios";
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


function App() {

  const inputRef = useRef(null);
    const [image, setImage] = useState('');

  function handleImage(e){
        console.log(e.target.file);
        setImage(e.target.files[0]);
  }

  // Functions to connect to aws
  function invertApi(){
    const formData = new FormData();
    formData.append("img", image);
    axios.get('invertUrl',formData).then((res) => {
      console.log(res);
      setImage(res);
    });
  }

  function flipHorizontalApi(){
    const formData = new FormData();
    formData.append("img", image);
    axios.get('flipHorizontalUrl',formData).then((res) => {
      console.log(res);
      setImage(res);
    });
  }

  function flipVerticalApi(){
    const formData = new FormData();
    formData.append("img", image);
    axios.get('flipVerticalUrl',formData).then((res) => {
      console.log(res);
      setImage(res);
    });
  }

   function increaseBApi(){
    const formData = new FormData();
    formData.append("img", image);
    axios.get('increaseBUrl',formData).then((res) => {
      console.log(res);
      setImage(res);
    });
  }

  function decreaseBApi(){
    const formData = new FormData();
    formData.append("img", image);
    axios.get('decreaseBUrl',formData).then((res) => {
      console.log(res);
      setImage(res);
    });
  }

   function sepiaApi(){
    const formData = new FormData();
    formData.append("img", image);
    axios.get('sepiaUrl',formData).then((res) => {
      console.log(res);
      setImage(res);
    });
  }

  function pixelateApi(){
    const formData = new FormData();
    formData.append("img", image);
    axios.get('pixelateUrl',formData).then((res) => {
      console.log(res);
      setImage(res);
    });
  }

  function binarizeApi(){
    const formData = new FormData();
    formData.append("img", image);
    axios.get('binarizeUrl',formData).then((res) => {
      console.log(res);
      setImage(res);
    });
  }


  return (
    <ChakraProvider theme={theme}>
      <Box as='b' textAlign="center" fontSize="xl" >
        <Box bg='whiteAlpha.400' boxShadow='md' mb={7} py={10} >
          <Text fontSize='4xl'>Serverless Image Processor</Text>
        </Box>

        {/* Choose file */}
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
          {/* Download button */}
          <GridItem w='100%' h='10' bg='blue.400' borderRadius='md' border='1px' >
            <Button w='100%' h='10' bg='blue.400' borderRadius='md' border='1px' >
         
               {
                  image?(
                    <Link w='100%' href={URL.createObjectURL(image)} download>Click to download</Link>
                      

                  ): <Link>
                  No Image
                  </Link>
              }
            </Button>
          </GridItem>
        </Grid>
      </Box>
      {/* Image */}
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

          {/* Transformation buttons */}
          <Button onClick={invertApi} m={5} bg='orange'>Invert</Button>
          <Button onClick={flipHorizontalApi} m={5} bg='orange'>Flip Horizontal</Button>
          <Button onClick={flipVerticalApi} m={5} bg='orange'>Flip Vertical</Button>
      

          <Button onClick={decreaseBApi} m={5} bg='orange'>Decrease Brightness</Button>
          <Button onClick={increaseBApi} m={5} bg='orange'>Increase Brightness</Button>
          <Button onClick={sepiaApi} m={5} bg='orange'>Sepia Filter</Button>


          <Button onClick={pixelateApi} m={5} bg='orange'>Pixelate</Button>
          <Button onClick={binarizeApi} m={5} bg='orange'>Binarize</Button>
        </Box>
            
        </Center>

     
    </ChakraProvider>
  );
}

export default App;
