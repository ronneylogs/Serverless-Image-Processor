import json
import numpy
import base64
from PIL import Image

# This file houses the lambda functions for the manipulations

# Invert
def invert(event, context):
    
    body = event["body"]

    content_type = event["headers"]["Content-Type"]
    
    # Turn image into array that we can work with
    pixels = numpy.array(body)
    
    # Get dimensions
    length = len(pixels)
    height = len(pixels[0])
    
    # Create new image
    newImg = numpy.zeros((length, height, 3)).tolist()
  
  
    # Goes through each pixel
    for column in range(length):
        for row in range(height):
            p = pixels[column][row]
            # Inverts the colour here
            new_r = 255 - p[0]
            new_g = 255 - p[1]
            new_b = 255 - p[2]
            # Set as manipulated image
            newImg[column][row] = [new_r,new_g,new_b]

    
    
    return {
        'statusCode': 200,
        'body': newImg
    }

# Flip horizontally
def flipHorizontal(event, context):

    body = event["body"]

    content_type = event["headers"]["Content-Type"]
    
    # Turn image into array that we can work with
    pixels = numpy.array(body)
    
    # Get dimensions
    length = len(pixels)
    height = len(pixels[0])
    
    # Create new image
    newImg = numpy.zeros((length, height, 3)).tolist()
  
    # Get last column
    l_column = (length-1)
    # Go through each pixel 
    for column in range(length):
        for row in range(height):
            # Change last column to first
            n_column = l_column - column
            newImg[column][row] = pixels[n_column][row]

    return {
        'statusCode': 200,
        'body': newImg
    }


# Flip vertically
def flipVertical(event, context):

    body = event["body"]

    content_type = event["headers"]["Content-Type"]
    
    # Turn image into array that we can work with
    pixels = numpy.array(body)
    
    # Get dimensions
    length = len(pixels)
    height = len(pixels[0])
    
    # Create new image
    newImg = numpy.zeros((length, height, 3)).tolist()

    l_row = (height-1)
    for column in range(length):
        for row in range(height):

            n_row = l_row - row
            newImg[column][row] = pixels[column][n_row]
  
    return {
        'statusCode': 200,
        'body': newImg
    }


# Converts to grayscale
def gray_scale(event, context):

    body = event["body"]

    content_type = event["headers"]["Content-Type"]
    
    # Turn image into array that we can work with
    pixels = numpy.array(body)
  
    # Get dimensions
    length = len(pixels)
    height = len(pixels[0])

    for column in range(length):
        for row in range(height):
        # Gets the average and turns rgb to avg (greyscale)
            p = pixels[column][row]
            avg=(p[0]+p[1]+p[2])/3
            new_r = p[0]=avg
            new_g = p[1]=avg
            new_b = p[2]=avg

            pixels[column][row] = [new_r,new_g,new_b]

    return {
        'statusCode': 200,
        'body': pixels
    }

# Sepia filter
def sepia_filter(event, context):

    body = event["body"]

    content_type = event["headers"]["Content-Type"]
    
    # Turn image into array that we can work with
    pixels = numpy.array(body)
      
    length = len(pixels)
    height = len(pixels[0])

    # Create new image
    newImg = numpy.zeros((length, height, 3)).tolist()


    # Sets maxrgb 255
    maxrgb=255
    for column in range(length):
        for row in range(height):
            p = pixels[column][row]
            # Does calculation for sepia filter
            calc_r=(p[0]*0.393)+(p[1]*0.769)+(p[2]*0.189)
            calc_g=(p[0]*0.349)+(p[1]*0.686)+(p[2]*0.168)
            calc_b=(p[0]*0.272)+(p[1]*0.534)+(p[2]*0.131)
            maxrgb=255
            # If value of each colour is bigger than maxrgb, than the colour will become maxrgb
            if calc_r>maxrgb:
                calc_r=maxrgb
                
            if calc_g>maxrgb:
                calc_g=maxrgb
                
            if calc_b>maxrgb:
                calc_b = maxrgb
     
            new_r = p[0]=int(calc_r)
            new_g = p[1]=int(calc_g)
            new_b = p[2]=int(calc_b)

            newImg[column][row] = [new_r,new_g,new_b]

    return {
        'statusCode': 200,
        'body': newImg
    }


# Decrease brightness
def decrease_brightness(event, context):

    body = event["body"]

    content_type = event["headers"]["Content-Type"]
    
    # Turn image into array that we can work with
    pixels = numpy.array(body)
      
    length = len(pixels)
    height = len(pixels[0])

    # Create new image
    newImg = numpy.zeros((length, height, 3)).tolist()

    for column in range(length):
        for row in range(height):
            # Each colour minus 10
            p = pixels[column][row]
            new_r = p[0]-10
            new_g = p[1]-10
            new_b = p[2]-10
            # Set 0 as the lowest it can go
            if new_r <0:
                new_r = 0
            if new_g <0:
                new_g = 0
            if new_b <0:
                new_b=0
        
            newImg[column][row] = [new_r,new_g,new_b]

    return {
        'statusCode': 200,
        'body': newImg
    }


# Increase brightness
def increase_brightness(event, context):
  
    body = event["body"]

    content_type = event["headers"]["Content-Type"]
    
    # Turn image into array that we can work with
    pixels = numpy.array(body)
      
    length = len(pixels)
    height = len(pixels[0])

    # Create new image
    newImg = numpy.zeros((length, height, 3)).tolist()

    for column in range(length):
        for row in range(height):
            # Each colour add 10
            p = pixels[column][row]
            new_r = p[0]+10
            new_g = p[1]+10
            new_b = p[2]+10
            #set 255 as the highest it can go
            if new_r >255:
                new_r = 255
            if new_g >255:
                new_g = 255
            if new_b >255:
                new_b=255
            
            newImg[column][row] = [new_r,new_g,new_b]

    return {
        'statusCode': 200,
        'body': newImg
    }


# Pixelate 
def pixelate(event, context):

    body = event["body"]

    content_type = event["headers"]["Content-Type"]
    
    # Turn image into array that we can work with
    pixels = numpy.array(body)
      
    length = len(pixels)
    height = len(pixels[0])

    # Create new image
    newImg = numpy.zeros((length, height, 3)).tolist()

    num_pixels = 16
    
    # Sees if image is dividable by 4, if not it cuts out the excess
    if length % 4 == 1:
        length -= 1
    if length % 4 == 2:
        length -= 2
    if length % 4 == 3:
        length -=3 
    if height % 4 == 1:
        height -= 1
    if height % 4 == 2:
        height -= 2
    if height % 4 == 3:
        height -= 3
    # Breaks pixels into 4 by 4
    for column in range(0,length,4):
        for row in range(0,height,4):
            # Sets values
            p_counter=[0,0,0]
            # Goes through pixel
            for l in range(4):
                for r in range(4):
                    p = pixels[column][row]
                    p_counter += str(l)
                    # Sets new colours
                    lr_counter=p_counter[0]
                    lg_counter=p_counter[1]
                    lb_counter=p_counter[2]
                


                # Finds average by dividing by 16
                new_r = (lr_counter)/ num_pixels
                new_g = (lg_counter) / num_pixels
                new_b = (lb_counter) / num_pixels
                pixels[column][row] = [new_r,new_g,new_b]

    return {
        'statusCode': 200,
        'body': newImg
    }
      
# Binarize
def binarize(event, context):

    body = event["body"]

    content_type = event["headers"]["Content-Type"]
    
    # Turn image into array that we can work with
    pixels = numpy.array(body)
      
    length = len(pixels)
    height = len(pixels[0])

    # Create new image
    newImg = numpy.zeros((length, height, 3)).tolist()

    newImg = gray_scale(pixels) 
    length = len(newImg)
    height = len(newImg[0])
    all_pixels = length * height
    threshold_accumulator = 0

    # Calculate the initial threshold 
    for column in range(length):
        for row in range(height):
            threshold_accumulator += newImg[column][row][0]

    init_threshold = threshold_accumulator / all_pixels

    # Keep looping unitl the the difference in thresholds are less than or eqaul to 10
    cond = True
    while cond:
        # Initialize variables
        background = []
        foreground = []
        background_accumulator = 0
        foreground_accumulator = 0

        for column in range(length):
            for row in range(height):
                p = newImg[column][row]

                # If the pixels have value less than or equal to the threshold, the pixels belong in the background image
                # If the pixels have value grater than the threshold, the pixels pbelong in the foreground image
                if p[0] <= init_threshold:
                    background += [p]
                elif p[0] > init_threshold:
                    foreground += [p]

        # Finding the average of the background and foreground
        for rgb in background:
            background_accumulator += rgb[0]
        for rgb in foreground:
            foreground_accumulator += rgb[0]
        
        average_background = background_accumulator / all_pixels

        average_foreground = foreground_accumulator / all_pixels

        threshold = (average_background + average_foreground) // 2

        # If the difference between the initial and new threshold is less than or equal to 10, then the new threshold is the desired threshold. exit the while loop
        # If the difference in thresholds is grater than 10, repeat while loop with the initial threshold being the new threshold
        if init_threshold - threshold <= 10:
            cond = False
        else:
            init_threshold = threshold      

    # If the pixel is less than or equal to the threshold value set it to black
    # If the pixel is grater than the threshold value set it to white
    for column in range(length):
        for row in range(height):
            gray_scale_p = newImg[column][row]

        if gray_scale_p[0] <= threshold:
            newImg[column][row] = [0,0,0]
        elif gray_scale_p[0] > threshold:
            newImg[column][row] = [255,255,255]
  
    return {
        'statusCode': 200,
        'body': newImg
    }


def lambda_handler(event, context):
    
    body = event["body"]

    content_type = event["headers"]["Content-Type"]
    
    # Turn image into array that we can work with
    oldImage = numpy.array(body)
    
    # Get dimensions
    length = len(body)
    height = len(body)
    
    # Create new image
    newImg = numpy.zeros((length, height, 3)).tolist()
    

    # Goes through each pixel
    for column in range(length):
        for row in range(height):
            
          p = pixels[column][row]
          # Inverts the colour here
          new_r = 255 - p[0]
          new_g = 255 - p[1]
          new_b = 255 - p[2]
          # Set as manipulated image
          newImg[column][row] = [new_r,new_g,new_b]
          
    # Save image
    im = Image.fromarray(newImg)
    im.save("image.jpg")
    
    # Convert image back to base64 and return to app
    with open("image.jpg", "rb") as image_file:
        data = base64.b64encode(image_file.read())
    
    
    return {
        'statusCode': 200,
        'body': data
    }
