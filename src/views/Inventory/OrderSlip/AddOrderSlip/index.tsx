import { yupResolver } from '@hookform/resolvers/yup';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import PageWrapper from '@/components/PageWrapper';
import ActionButton from '@/components/ProButton/ActionButton';
import ProForm from '@/components/ProForm';
import ProFormAutocomplete from '@/components/ProForm/ProFormAutocomplete';
import ProFormCheckboxSelect from '@/components/ProForm/ProFormCheckboxSelect';
import ProFormContent from '@/components/ProForm/ProFormContent';
import ProFormDate from '@/components/ProForm/ProFormDate';
import ProFormSelect from '@/components/ProForm/ProFormSelect';
import ProFormTextField from '@/components/ProForm/ProFormTextField';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Validation from '@/utils/Validation';
import * as yup from 'yup';
import { AddCash } from './utils/types';

const validationSchema = yup.object().shape({
  date: Validation.date().optional(),
  objectType: Validation.select(0),
  cashAccount: yup.number().nullable().default(null).required(),
  billType: yup.number().nullable().default(null).required(),
  object: Validation.string().optional(),
  documentType: yup.number().nullable().default(null),
  documentId: Validation.string().optional(),
  amount: Validation.string(),
  note: Validation.string().optional(),
});

const AddcashTable = () => {
  const { t } = useTranslation();

  const form = useForm<AddCash>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const handleSubmit = (value: any) => {
    console.log(value);
  };

  return (
    <PageWrapper title='Thêm phiếu thu chi'>
      <PageBreadcrumbs
        title='Tạo phiếu đặt hàng'
        items={[
          { link: '/inventory', text: 'Kho hàng' },
          { link: '/inventory/order-slip', text: 'Phiếu đặt hàng' },
        ]}
      />
      <ProForm form={form} onFinish={handleSubmit}>
        <ProFormContent sx={{ mb: 4 }}>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Paper sx={{ p: 2, pb: 5 }}>
                <Stack mb={1.5}>
                  <ErrorOutlineIcon />
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    {t('Thông tin cơ bản')}
                  </Typography>
                </Stack>
                <Divider />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={12} lg={12}>
                    <ProFormSelect
                      name='objectType'
                      placeholder='- Loại yêu cầu -'
                      options={[{ value: 0, label: 'Nhập kho' }]}
                      renderLabel={(option) => option.label}
                      renderValue={(option) => option.value}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormAutocomplete
                      name='acv'
                      options={[{ id: 1, label: '123' }]}
                      renderValue={(item) => item.id}
                      renderLabel={(item) => item.label}
                      placeholder={'Nhà cung cấp'}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormCheckboxSelect
                      name='store'
                      label={t('Cửa hàng')}
                      placeholder={t('Cửa hàng')}
                      options={[
                        { value: 1, label: 'Chưa gắn kho' },
                        { value: 2, label: 'Linh kiện Sài Gòn' },
                      ]}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormTextField name='object' placeholder='Số hóa đơn' />
                  </Grid>

                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormDate
                      name='date'
                      DatePickerProps={{ label: 'Ngày đặt hàng' }}
                      type='start'
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormTextField name='object' placeholder='Ghi chú' />
                  </Grid>

                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormTextField name='object' placeholder='Tỉ giá NDT - VND' />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Paper sx={{ p: 2, pb: 5 }}>
                <Stack mb={1.5}>
                  <ErrorOutlineIcon />
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    {t('Thông tin phiếu nhập kho')}
                  </Typography>
                </Stack>
                <Divider />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={12} lg={12}>
                    <ProFormAutocomplete
                      name='acv'
                      options={[{ id: 1, label: '123' }]}
                      renderValue={(item) => item.id}
                      renderLabel={(item) => item.label}
                      placeholder={'Nhà cung cấp'}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </ProFormContent>
        <Stack spacing={2}>
          <ActionButton actionType='cancel' sx={{ background: 'white' }}>
            Hủy
          </ActionButton>
          <ActionButton actionType='save' variant='contained' type='submit'>
            Lưu
          </ActionButton>
        </Stack>
      </ProForm>
    </PageWrapper>
  );
};

export default AddcashTable;
