import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Profile from './Sidebar/Profile';
import { Theme, CSSObject, useTheme } from '@mui/material/styles';
import { MINI_SIDEBAR_WIDTH, SIDEBAR_WIDTH } from '@/constants/layouts';
import { useMediaQuery } from '@mui/material';

interface Props {
  collapsed: boolean;
  onToggleSidebar: () => void;
  onToggleCollapsed: () => void;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: `calc(100% - ${MINI_SIDEBAR_WIDTH}px)`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
});

const Header = (props: Props) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <AppBar
      position="fixed"
      elevation={10}
      sx={{ 
        color: 'common.black', 
        backgroundColor: '#fff', 
        height: '64px',
        borderBottom: 'thin solid #E6E8F0',
        marginLeft: 'auto',
        zIndex: 9,
        width: lgUp ? (props.collapsed ? openedMixin(theme).width : closedMixin(theme).width) : '100%'
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
