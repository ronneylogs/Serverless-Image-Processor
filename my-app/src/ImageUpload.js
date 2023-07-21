import React from 'react'
import {useState,useRef} from 'react'
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
  Center,
} from '@chakra-ui/react';

function ImageUpload(){

    const inputRef = useRef(null);
    const [image, setImage] = useState('');

    function handleImage(e){
        console.log(e.target.file);
        setImage(e.target.files[0]);

        
    }

    // Upload image to aws

    return(
        
        <Center m={5} alignItems='center' >

            <Box w='50%'>
                    {
                        image?(
                            <img src={URL.createObjectURL(image)}></img>

                        ): <img src='./logo.svg'></img>
                    }
                <input type='file' name='file' ref={inputRef} onChange={handleImage}></input>
                <button>Submit</button>
        
            </Box>


        </Center>



    )


}

export default ImageUpload;