import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  ButtonBase,
  Card,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LogoutOutlined } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from 'react';
import avatar1 from '@/assets/images/users/avatar-1.png';
import { setIsAuth, setProfile } from '@/slices/auth';
import { removeLocalToken } from '@/utils/AuthHelper';
import { signOut } from '@/services/auth-service';
import { useAppDispatch } from '@/store';

// ==============================|| PROFILE COMPONENT ||============================== //

const Profile = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleLogout = async () => {
    await signOut();
    dispatch(setIsAuth(false));
    dispatch(setProfile(null));
    removeLocalToken();
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
        }}
        aria-label='open profile'
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <Stack direction='row' spacing={1.25} alignItems='center' sx={{ p: 0.5 }}>
          <Avatar
            alt='profile user'
            src={avatar1}
            sx={{ width: 32, height: 32, borderRadius: '100%' }}
          />
          <Typography variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
            John Doe
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        open={open}
        anchorEl={anchorEl}
        sx={{
          zIndex: 999,
          marginTop: '10px !important'
        }}
        placement='bottom-start'
      >
        <Paper sx={{ width: 290, minWidth: 240, maxWidth: { xs: 250, md: 250 } }}>
          <ClickAwayListener onClickAway={handleClick}>
            <Card>
              <List component='nav' sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 24 } }}>
                <ListItemButton>
                  <ListItemIcon>
                    <EditOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary='Edit Profile'
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '14px',
                      },
                    }}
                  />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutOutlined />
                  </ListItemIcon>
                  <ListItemText
                    onClick={handleLogout}
                    primary='Logout'
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '14px',
                      },
                    }}
                  />
                </ListItemButton>
              </List>
            </Card>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </Box>
  );
};

export default Profile;
