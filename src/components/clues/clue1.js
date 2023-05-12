import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Draggable from 'react-draggable';

import image1 from './clue1/1.png';
import image2 from './clue1/2.png';
import image3 from './clue1/3.png';
import image4 from './clue1/4.png';

const Clue1 = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      image: image2,
      left: 0,
      top: 0,
    },
    {
      id: 2,
      image: image3,
      left: 300,
      top: 0,
    },
    {
      id: 3,
      image: image4,
      left: 0,
      top: 300,
    },
    {
      id: 4,
      image: image1,
      left: 300,
      top: 300,
    },
  ]);

  useEffect(() => {
    // Load saved positions from local storage
    const savedPositions = localStorage.getItem('clue1Positions');
    if (savedPositions) {
      const parsedPositions = JSON.parse(savedPositions);
      setImages(parsedPositions);
    }
  }, []);

  const handleDrag = (index, e, ui) => {
    const { x, y } = ui;
    const newImages = [...images];
    const boxWidth = 600;
    const boxHeight = 600;
    const imageWidth = 300;
    const imageHeight = 300;
    const maxX = boxWidth - imageWidth;
    const maxY = boxHeight - imageHeight;
    const newLeft = Math.max(0, Math.min(x, maxX));
    const newTop = Math.max(0, Math.min(y, maxY));
    newImages[index] = {
      ...newImages[index],
      left: newLeft,
      top: newTop,
    };
    setImages(newImages);
  };

  useEffect(() => {
    // Save current positions to local storage
    localStorage.setItem('clue1Positions', JSON.stringify(images));
  }, [images]);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '600px',
        minWidth: '600px',
        border: '1px solid grey',
        overflow: 'hidden', // Added this to hide overflowing images
      }}
    >
      {images.map((image, index) => (
        <Draggable key={image.id} onDrag={(e, ui) => handleDrag(index, e, ui)}>
          <div
            style={{
              position: 'absolute',
              left: `${image.left}px`,
              top: `${image.top}px`,
              width: '75%',
              height: '75%',
            }}
          >
            <div
              style={{
                width: '60%',
                height: '60%',
                backgroundImage: `url(${image.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain', // Changed this to maintain aspect ratio
                backgroundPosition: 'center', // Added this to center the image
              }}
            />
          </div>
        </Draggable>
      ))}
    </Box>
  );
};

export default Clue1;
