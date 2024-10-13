import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box/Box';
import ActionButton from '@/components/ProButton/ActionButton';
import ProMenu from '@/components/ProMenu';

const ActionButtonComponent = () => {
  return (
    <Box sx={{ margin: '2px' }}>
      <ProMenu
        position='left'
        items={[
          {
            label: 'Xóa các nhóm khách hàng đã chọn',
            value: 1,
            actionType: 'remove',
          },
          {
            label: 'Xóa tất cả nhóm khách hàng',
            value: 2,
            actionType: 'delete',
          },
          {
            label: 'Xuất excel',
            value: 3,
            actionType: 'upload',
          },
        ]}
      >
        <ActionButton variant='contained' color='info' onClick={() => console.log('abc')}>
          Thao tác
          <ExpandMoreIcon />
        </ActionButton>
      </ProMenu>
    </Box>
  );
};

export default ActionButtonComponent;
