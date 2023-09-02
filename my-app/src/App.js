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

  // imgSRC = "URL.createObjectURL("+image+")";

  const inputRef = useRef(null);
    const [image, setImage] = useState('');

  function handleImage(e){
        console.log(e.target.file);
        setImage(e.target.files[0]);
  }

  // Functions to connect to aws
  function invertApi(){
    const formData = new FormData();
    let image64 = blobToBase64(image);
    formData.append("img", image64);
    axios.get('invertUrl',formData).then((res) => {
      console.log(res);
      let blob = b64toBlob(res);
      setImage(blob);
    });
  }

  function flipHorizontalApi(){
    const formData = new FormData();
    let image64 = blobToBase64(image);
    formData.append("img", image64);
    axios.get('flipHorizontalUrl',formData).then((res) => {
      console.log(res);
      let blob = b64toBlob(res);
      setImage(blob);
    });
  }

  function flipVerticalApi(){
    const formData = new FormData();
    let image64 = blobToBase64(image);
    formData.append("img", image64);
    axios.get('flipVerticalUrl',formData).then((res) => {
      console.log(res);
      let blob = b64toBlob(res);
      setImage(blob);
    });
  }

   function increaseBApi(){
    const formData = new FormData();
    let image64 = blobToBase64(image);
    formData.append("img", image64);
    axios.get('increaseBUrl',formData).then((res) => {
      console.log(res);
      let blob = b64toBlob(res);
      setImage(blob);
    });
  }

  function decreaseBApi(){
    const formData = new FormData();
    let image64 = blobToBase64(image);
    formData.append("img", image64);
    axios.get('decreaseBUrl',formData).then((res) => {
      console.log(res);
      let blob = b64toBlob(res);
      setImage(blob);
    });
  }

   function sepiaApi(){
    const formData = new FormData();
    let image64 = blobToBase64(image);
    formData.append("img", image64);
    axios.get('sepiaUrl',formData).then((res) => {
      console.log(res);
      let blob = b64toBlob(res);
      setImage(blob);
    });
  }

  function pixelateApi(){
    const formData = new FormData();
    let image64 = blobToBase64(image);
    formData.append("img", image64);
    axios.get('pixelateUrl',formData).then((res) => {
      console.log(res);
      let blob = b64toBlob(res);
      setImage(blob);
    });
  }

  function binarizeApi(){
    const formData = new FormData();
    let image64 = blobToBase64(image);
    formData.append("img", image64);
    axios.get('binarizeUrl',formData).then((res) => {
      console.log(res);
      let blob = b64toBlob(res);
      setImage(blob);
    });
  }

  // Converts image blob to base64
  const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  // Converts base64 to imag blob
  const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }


  return (
    <ChakraProvider theme={theme}>
      <Box as='b' textAlign="center" fontSize="xl" >
        <Box bg='whiteAlpha.400' boxShadow='md' mb={7} py={5} >
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
