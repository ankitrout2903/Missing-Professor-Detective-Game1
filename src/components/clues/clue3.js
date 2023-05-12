import { Box, Paper } from '@mui/material';
import image3 from './clue3/clue3.png';

const Clue3 = () => (
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
      <Paper elevation={3}>
        <img src={image3} alt="Clue 3" style={{ width: '100%', height: '100%' }} />
      </Paper>
    </div>
  </Box>
);

export default Clue3;
