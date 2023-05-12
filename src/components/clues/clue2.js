import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import image2 from './clue2.jpg';

const Clue2 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleOptionSelected = () => {
    if (selectedOption === 'chicken') {
      const updatedTimeSpent = {
        clue1: 0,
        clue2: 0,
        clue3: 0,
        clue4: 0,
        clue5: 0,
      };
      localStorage.setItem('clue1', updatedTimeSpent.clue1.toString());
      localStorage.setItem('clue2', updatedTimeSpent.clue2.toString());
      localStorage.setItem('clue3', updatedTimeSpent.clue3.toString());
      localStorage.setItem('clue4', updatedTimeSpent.clue4.toString());
      localStorage.setItem('clue5', updatedTimeSpent.clue5.toString());
      alert(
        'You clicked on the wrong button which triggered the alarm 🚨🚓. And you reached Dead-End-1'
      );
      window.location.reload();

    } else if (selectedOption === 'puppies') {
      alert('Congratulations! 🎉🎊 You have reached the next clue. You have unlocked the secret 🔐 door which leads you to the next stage');
    }
    handleDialogClose();
  };


  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '500px',
        minWidth: '500px',
        border: '1px solid grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Button
          onClick={handleImageClick}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer',
          }}
        >
          <Paper elevation={3}>
            <img src={image2} alt="Clue 2" style={{ width: '100%', height: '100%' }} />
          </Paper>
        </Button>
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Select an option:</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <FormControlLabel value="chicken" control={<Radio />} label="Chicken" />
              <FormControlLabel value="puppies" control={<Radio />} label="Puppies" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOptionSelected}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Clue2;
