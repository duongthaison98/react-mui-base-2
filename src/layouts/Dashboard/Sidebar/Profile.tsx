import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { HEADER_HEIGHT } from 'constants/layouts';
import useUser from 'hooks/useUser';
import { useContext } from 'react';
import { CollapseContext } from '.';
import { ButtonBase, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRef, useState } from 'react';
import avatar1 from 'assets/images/users/avatar-1.png';

const Profile = () => {
  const collapsed = useContext(CollapseContext);
  const user = useUser();

  const theme = useTheme();

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  if (collapsed) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: HEADER_HEIGHT,
        }}
      >
        <Avatar>Đ</Avatar>
      </Box>
    );
  }

  return (
    <ButtonBase
      sx={{
        p: 0.25,
        borderRadius: 1,
        '&:hover': { bgcolor: 'secondary.lighter' },
        '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
      }}
      aria-label="open profile"
      ref={anchorRef}
      aria-controls={open ? 'profile-grow' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
    >
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
        {/* <Avatar alt="profile user" src={avatar1} size="sm" /> */}
        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
          John Doe
        </Typography>
      </Stack>
    </ButtonBase>
  );
};

export default Profile;
