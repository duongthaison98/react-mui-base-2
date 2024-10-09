import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import ActionButton from 'components/ProButton/ActionButton';
import ProMenu from 'components/ProMenu';
import AddIcon from '@mui/icons-material/Add';
const CreateCustomerButton = () => {


  return (
    <Box sx={{ margin: '2px' }}>
      <ProMenu
        position="left"
        items={[
          {
            label: 'Thêm mới hóa đơn cho khách này',
            value: 1,
            actionType: 'add',
          },
          {
            label: 'Thêm mới hóa đon bán lẻ cho khách này',
            value: 2,
            actionType: 'add',
          },
          {
            label: 'Thêm mới hóa đon bán sỉ cho khách này',
            value: 3,
            actionType: 'add',
          },
        ]}
      >
        <ActionButton
          variant="contained"
          color="success"
          startIcon = <AddIcon/>
          // onClick={handleSubmitFilters}
        >
          Thêm mới
          <ExpandMoreIcon />
        </ActionButton>
      </ProMenu>
    </Box>
  );
};

export default CreateCustomerButton;
