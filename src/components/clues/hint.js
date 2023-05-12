import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Info } from '@mui/icons-material';

const HintButton = ({ hint }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Tooltip title={hint} open={open} onClose={handleClose} placement="right">
      <IconButton onClick={handleOpen}>
        <Info />
      </IconButton>
    </Tooltip>
  );
};

export default HintButton;
