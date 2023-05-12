import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Link, IconButton, InputAdornment, TextField, Checkbox, Button, Typography } from '@mui/material';
import { DndProvider } from 'react-dnd';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { Clue1, Clue2, Clue3, Clue4, Clue5 } from '../components/clues';

// ----------------------------------------------------------------------

export default function GamePage() {
  const [timeSpent, setTimeSpent] = useState({
    clue1: parseInt(localStorage.getItem('clue1'), 10) || 0,
    clue2: parseInt(localStorage.getItem('clue2'), 10) || 0,
    clue3: parseInt(localStorage.getItem('clue3'), 10) || 0,
    clue4: parseInt(localStorage.getItem('clue4'), 10) || 0,
    clue5: parseInt(localStorage.getItem('clue5'), 10) || 0,
  });

  const sumTimeSpent = () => {
    let totalTime = parseInt(localStorage.getItem('totalTime'), 10) || 0;
  
    Object.values(timeSpent).forEach(clueTime => {
      totalTime += clueTime;
    });
  
    return totalTime;
  };
  
  useEffect(() => {
    const totalTime = sumTimeSpent();
    localStorage.setItem('totalTime', totalTime.toString());
    localStorage.setItem('clue1', timeSpent.clue1.toString());
    localStorage.setItem('clue2', timeSpent.clue2.toString());
    localStorage.setItem('clue3', timeSpent.clue3.toString());
    localStorage.setItem('clue4', timeSpent.clue4.toString());
    localStorage.setItem('clue5', timeSpent.clue5.toString());
  }, [timeSpent]);

  const handleResetValues = () => {
    localStorage.clear();
    setTimeSpent({
      clue1: 0,
      clue2: 0,
      clue3: 0,
      clue4: 0,
      clue5: 0,
    });
  };

  const handleUseLocalStorage = () => {
    // Do nothing, as the values are already loaded from local storage
  };

  useEffect(() => {
    const storedTimeSpent = {
      clue1: parseInt(localStorage.getItem('clue1'), 10) || 0,
      clue2: parseInt(localStorage.getItem('clue2'), 10) || 0,
      clue3: parseInt(localStorage.getItem('clue3'), 10) || 0,
      clue4: parseInt(localStorage.getItem('clue4'), 10) || 0,
      clue5: parseInt(localStorage.getItem('clue5'), 10) || 0,
    };
  
    const isAnyClueNonZero = Object.values(storedTimeSpent).some(clueTime => clueTime !== 0);
  
    if (isAnyClueNonZero) {
      const confirmation = window.confirm(
        'Do you want to use the values from local storage? Press "OK" to use them or "Cancel" to reset all values to 0.'
      );
      if (confirmation) {
        setTimeSpent(storedTimeSpent);
      } else {
        localStorage.clear();
        setTimeSpent({
          clue1: 0,
          clue2: 0,
          clue3: 0,
          clue4: 0,
          clue5: 0,
        });
      }
    }
  }, []);
  
  // Example usage

  const [activeClue, setActiveClue] = useState(null);

  const [timerId, setTimerId] = useState(null);

  const handleClueClick = (clueNum) => {
    if (clueNum !== activeClue) {
      // Stop the timer of the previously active clue
      clearInterval(timerId);
  
      setActiveClue(clueNum);
  
      // Check if the clue time is greater than 0
      if (timeSpent[`clue${clueNum}`] > 0) {
        // Start the timer of the new active clue with the previous elapsed time
        const startTime = new Date(new Date()) - timeSpent[`clue${clueNum}`] * 1000;
        setTimerId(
          setInterval(() => {
            const endTime = new Date();
            setTimeSpent((prevState) => ({
              ...prevState,
              [`clue${clueNum}`]: Math.floor((endTime - startTime) / 1000),
            }));
          }, 1000)
        );
      } else {
        // Start the timer of the new active clue from 0
        const startTime = new Date();
        setTimerId(
          setInterval(() => {
            const endTime = new Date();
            setTimeSpent((prevState) => ({
              ...prevState,
              [`clue${clueNum}`]: Math.floor((endTime - startTime) / 1000),
            }));
          }, 1000)
        );
      }
    }
  };
  

  const check = (clueNum) => {
    const prevClue = clueNum - 1;
    if (timeSpent[`clue${prevClue}`] === 0) {
      return true;
    }

    return false;
  };

  const handleClueSubmit = () => {
    // Calculate the total time spent
    const totalTime = sumTimeSpent();
    localStorage.setItem('totalTime', totalTime.toString());

    // Make an API call to send the total time spent to the backend
    // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual endpoint URL
    // fetch('YOUR_BACKEND_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     totalTime,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle the response from the backend if needed
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     // Handle any errors that occur during the API call
    //     console.error(error);
    //   });
  };


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Game Page
        </Typography>
      </Grid>

<Grid item xs={12} md={3} container direction="column">
        {[1, 2, 3, 4, 5].map((clueNum) => (
          <Button
            key={clueNum}
            onClick={() => handleClueClick(clueNum)}
            variant="contained"
            sx={{ mb: 3, maxWidth: 200 }}
            disabled={clueNum !== 1 && check(clueNum)}
          >
            Clue {clueNum}
          </Button>
        ))}
      </Grid>

<Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {activeClue === 0 && <h2>Select a Clue</h2>}
        <DndProvider backend={HTML5Backend}>{activeClue && activeClue === 1 && <Clue1 />}</DndProvider>
        {activeClue && activeClue === 2 && (
          <>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Click on the Painting to chek behind it
            </Typography>
            <Clue2 />
          </>
        )}
        {activeClue && activeClue === 3 && <Clue3 />}
        {activeClue && activeClue === 4 && <Clue4 />}
        {activeClue && activeClue === 5 && <Clue5 handleClueSubmit={handleClueSubmit}  />}
      </Grid>

<Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Time Spent
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Clue 1: {timeSpent.clue1} seconds
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Clue 2: {timeSpent.clue2} seconds
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Clue 3: {timeSpent.clue3} seconds
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Clue 4: {timeSpent.clue4} seconds
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Clue 5: {timeSpent.clue5} seconds
        </Typography>
      </Grid>
    </Grid>
  );
}