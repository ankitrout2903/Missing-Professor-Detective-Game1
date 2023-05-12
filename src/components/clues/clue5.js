import { useState } from 'react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import HintButton from './hint';
import image5 from './lockscreen.avif';

const Clue5 = ({handleClueSubmit}) => {
  const [password, setPassword] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = () => {
    if (password === 'Mateo@#7108') {
      const email = localStorage.getItem('email');
      // Construct the URL with the email parameter
      const url = `http://localhost:3001/users/${email}`;
    
      // Prepare the data to be sent in the request body
      const data = {
        email,
        clue1Time : localStorage.getItem('clue1'),
        clue2Time : localStorage.getItem('clue2'),
        clue3Time : localStorage.getItem('clue3'),
        clue4Time : localStorage.getItem('clue4'),
        clue5Time : localStorage.getItem('clue5'),
        totalTime : localStorage.getItem('totalTime'),
        completed: true,
      };
    
      // Send a POST request to the API endpoint
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          // Handle the response from the API
          console.log(result);
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error(error);
        });
    
      
        alert('Congratulations 🎉.You have cracked opened the laptop 🔐 which has aces to the chip implanted on professors teeth an dhas the CCTV🎦 footage of the kidnapper. You traced professor and rescued him🎊 ');
        handleClueSubmit();

    }
     else {
      setErrorCount(errorCount + 1);
      setPassword('');
      if (errorCount === 2) {
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
        alert('Error❌ 3 wrong consecutive passwords entered, encrypting the disk... you reached Dead-End 2 🔚');
        window.location.reload();
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '400px',
        minWidth: '500px',
        border: '1px solid grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'cover' }}>
        <img src={'https://img.freepik.com/premium-vector/cute-rabbit-wallpaper-chibi-style-vector-pastel-colour_493693-24.jpg?w=1060'} alt="Clue 5" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: '125px', left: '35%', transform: 'translateX(-50%)' }}>
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            helperText={`${3 - errorCount} attempts remaining`}
            sx={{ color: 'black', width: '250px' }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleTogglePassword} size="small" sx={{ p: '6px' }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <HintButton hint="ohh you forgot you password professor here is a quick hint 😉:{Name}@#number" />
          <Button onClick={handleLogin} variant="contained" sx={{ marginLeft: '10px' }}>
            Login
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Clue5;
