import { useContext } from 'react';
import { CollapseContext } from '.';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Logo = () => {
  const collapsed = useContext(CollapseContext);

  if (collapsed) {
    return (
      <Box sx={{ paddingX: '17px', paddingY: '20px' }}>
        <Typography sx={{ whiteSpace: 'nowrap' }}>HLG</Typography>
      </Box>
    );
  }

  return (
    <Toolbar sx={{ whiteSpace: 'nowrap' }}>
      <Typography>Human Loss Guard</Typography>
    </Toolbar>
  );
};

export default Logo;
