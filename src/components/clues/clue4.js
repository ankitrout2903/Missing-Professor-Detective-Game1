import { useState } from 'react';
import { Box, Paper, Button, Modal, Typography } from '@mui/material';
import image4 from './clue2.jpg';

const Clue4 = () => {
  const [digits, setDigits] = useState(['0', '0', '0', '0']);
  const [showImage, setShowImage] = useState(false);

  const handleDigitClick = (index, increment) => {
    const currentDigit = digits[index];
    let newDigit = parseInt(currentDigit, 10) + increment;
    if (newDigit < 0) {
      newDigit = 9;
    } else if (newDigit > 9) {
      newDigit = 0;
    }
    setDigits([...digits.slice(0, index), newDigit.toString(), ...digits.slice(index + 1)]);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleUnlock = () => {
    const code = digits.join('');
    if (code === '7108') {
      setShowPopup(true);
    } else {
      alert('Incorrect code. Its okay lets take our time to crack it. may be the last digit in the code would be sum of all these digits🤔');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  return (
    <Box
      sx={{
        minHeight: '500px',
        minWidth: '500px',
        border: '1px solid grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      
      
      <Modal
  open={showPopup}
  onClose={handleClosePopup}
  sx={{
    backgroundColor: '#f8f2d9',
    border: '1px solid #a6a6a6',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    padding: '20px',
    width: '80%',
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: '18px',
    lineHeight: '1.5',
  }}
>
  <div>
    <Typography
      sx={{
        fontSize: '28px',
        marginBottom: '20px',
        textAlign: 'center',
      }}
    >
      You Found an Old Letter
    </Typography>
    <Typography
  sx={{
    marginBottom: '20px',
    textAlign: 'justify',
  }}
>
Dear Professor Sycamore,

I'm missing you so much during my summer vacation! While you're out there researching animals, I wanted to take a moment to tell you how much I love and miss you, Dad.

Summer breaks are a time for family bonding and creating special memories, and I wish you were here with me. Your dedication to animal research has always amazed me, and I'm proud to be your son.

Even though we're apart, I carry your love for animals in my heart. I can't wait to hear all about your incredible animal discoveries when you come back.

Sending you all my love and longing for your return,

Mateo🥰
(Your lovely Son)
</Typography>

    <Button
      onClick={handleClosePopup}
      sx={{
        backgroundColor: '#ffdf80',
        border: 'none',
        color: '#333',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        position: 'absolute',
        bottom: '20px',
        right: '20px',
      }}
    >
      Close
    </Button>
  </div>
</Modal>
{showImage && <img src={image4} alt="Clue 4" style={{ width: '100%', height: '100%' }} />}<div style={{ position: 'relative', width: '400px', height: '200px' }}>
        {!showImage && (
          <Paper elevation={3} style={{ width: '100%', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                {digits.map((digit, index) => (
                  <Button key={index} style={{ fontSize: '50px' }} onClick={() => handleDigitClick(index, 1)}>
                    {digit}
                  </Button>
                ))}
              </div>
              <Button onClick={handleUnlock} variant="contained" sx={{ marginTop: '20px' }}>
                Unlock
              </Button>
            </div>
          </Paper>
        )}
      </div>

    </Box>


  );
};

export default Clue4;
