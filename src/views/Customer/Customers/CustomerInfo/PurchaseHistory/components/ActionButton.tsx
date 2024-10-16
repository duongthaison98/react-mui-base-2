import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box/Box';
import ActionButton from 'components/ProButton/ActionButton';
import ProMenu from 'components/ProMenu';
import SettingsIcon from '@mui/icons-material/Settings';

const ActionButtonComponent = () => {
  return (
    <Box sx={{ margin: '2px' }}>
      <ProMenu
        position="left"
        items={[
          {
            label: 'Xuất excel',
            value: 1,
            actionType: 'upload',
          },
        ]}
      >
        <ActionButton
          variant="contained"
          color="success"
          startIcon=<SettingsIcon />
        >
          Thao tác
          <ExpandMoreIcon />
        </ActionButton>
      </ProMenu>
    </Box>
  );
};

export default ActionButtonComponent;
