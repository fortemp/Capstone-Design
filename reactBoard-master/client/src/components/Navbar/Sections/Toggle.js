import React from 'react'
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Box from '@material-ui/core/Box'
function Toggle() {
  return (
      <div id="toggleBoxContainer">
          <Box
        id="toggleBox"
        sx={{
            width: 37,
            height: 37,
            backgroundColor: '#a37c6b',
            '&:hover': {
            backgroundColor: '#926b5a',
            opacity: [0.9, 0.8, 0.7],
            },
            }}
        >
            <ArrowUpwardIcon
            sx={{ color: '#555555' }} />
        </Box>
      </div>
  )
}

export default Toggle