import { yupResolver } from '@hookform/resolvers/yup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import ActionButton from 'components/ProButton/ActionButton';
import ProForm from 'components/ProForm';
import ProFormSelect from 'components/ProForm/ProFormSelect';
import ProFormTextField from 'components/ProForm/ProFormTextField';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Validation from 'utils/Validation';

interface Props {
  open: boolean;
  handleClose: VoidFunction;
}

interface UpdateDebtHistoryType {
  paymentAppointmentDate: string | null;
  customerName: string | null;
  store: number | null;
  content: string | null;
}

const schema = Validation.shape({
  paymentAppointmentDate: Validation.string().optional(),
  customerName: Validation.string().optional(),
  store: Validation.select(0).optional(),
  content: Validation.string().optional(),
});

const UpdateDebtHistory = (props: Props) => {
  const { open, handleClose } = props;

  const form = useForm<UpdateDebtHistoryType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Cập nhật lịch sử nhắc nợ</DialogTitle>

      <DialogContent>
        <ProForm
          form={form}
          // onFinish={handleSubmit}
          PaperProps={{ sx: { p: 2 } }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <ProFormTextField
                name="paymentAppointmentDate"
                label={t('Ngày hẹn trả')}
                placeholder={t('Ngày hẹn trả')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <ProFormTextField
                name="customerName"
                label={t('Tên khách hàng')}
                placeholder={t('Tên khách hàng')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <ProFormSelect
                name="store"
                label={t('Tên cửa hàng')}
                placeholder={t('Tên cửa hàng')}
                options={[
                  { value: 1, label: 'A' },
                  { value: 2, label: 'B' },
                  { value: 3, label: 'C' },
                ]}
                renderLabel={(option) => option.label}
                renderValue={(option) => option.value}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <ProFormTextField
                name="content"
                label={t('Nội dung')}
                placeholder={t('Nội dung')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </ProForm>
      </DialogContent>
      <DialogActions>
        <ActionButton variant="contained" color="primary" onClick={handleClose}>
          Hủy
        </ActionButton>
        <ActionButton variant="contained" color="success" type="submit">
          Tạo
        </ActionButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDebtHistory;
