import { Box, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Profile from './Sidebar/Profile';

interface Props {
  collapsed: boolean;
  onToggleSidebar: () => void;
  onToggleCollapsed: () => void;
}

const Header = (props: Props) => {
  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{ 
        color: 'common.black', 
        backgroundColor: '#fff', 
        height: '64px',
        borderBottom: 'thin solid #E6E8F0',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
        <IconButton
          onClick={props.onToggleCollapsed}
          edge="start"
          sx={{
            color: '#000',
            borderRadius: '4px',
            width: '36px',
            height: '36px',
            fontSize: '1rem',
            backgroundColor: '#f0f0f0'
          }}
        >
          <MenuIcon />
        </IconButton>
        <Profile />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
