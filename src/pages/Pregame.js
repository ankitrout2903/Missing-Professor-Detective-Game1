import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Pregame = () => {
  const navigate = useNavigate();
  const [currentPoint, setCurrentPoint] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPoint((prevPoint) => prevPoint + 1);
    }, 1000); // Delay in milliseconds before showing the next point

    return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  }, [currentPoint]);

  const onStart = () => {
    navigate('/game', { replace: true });
  };

  const points = [
    "Welcome to 'Mystery Solvers: The Vanishing Professor'!",
    'Your esteemed professor has disappeared without a trace.',
    'He had a circuit chip implanted in his teeth during his animal communication research.',
    "Crack open his laptop to uncover his whereabouts and the chip's significance.",
    'Find five hidden clues scattered throughout his life and work.',
    'Explore the professor\'s office, analyze documents, and interview suspects.',
    'Every decision you make brings you closer to solving the mystery.',
    'Danger lurks, so stay vigilant.',
    'Sharpen your detective skills and prepare for an immersive adventure.',
    'Uncover secrets and unveil the truth in "Mystery Solvers: The Vanishing Professor"!'
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h2" sx={{ mb: 4 }}>
        Welcome to the Mystery Game
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {points.slice(0, currentPoint).map((point, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {point}
          </span>
        ))}
      </Typography>
      {currentPoint > points.length && (
        <Button onClick={onStart} variant="contained" color="primary">
          Enter the Game
        </Button>
      )}
    </Box>
  );
};

export default Pregame;
