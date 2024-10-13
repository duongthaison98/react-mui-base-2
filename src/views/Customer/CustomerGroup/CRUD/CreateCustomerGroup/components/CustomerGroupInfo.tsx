import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import ProForm from '@/components/ProForm';
import ProFormContent from '@/components/ProForm/ProFormContent';
import ProFormHeader from '@/components/ProForm/ProFormHeader';
import ProFormTextField from '@/components/ProForm/ProFormTextField';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomerGroupInfoType } from '../utils/type';

interface Props {
  form: UseFormReturn<CustomerGroupInfoType>;
}

const CustomerGroupInfo = (props: Props) => {
  const { form } = props;
  const { t } = useTranslation();

  return (
    <ProForm form={form}>
      <ProFormContent m={2}>
        <ProFormHeader>
          <Grid container spacing={2} alignItems='center' justifyContent='center'>
            <div style={{ display: 'inline-flex', alignItems: 'center', marginTop: '20px' }}>
              <PersonIcon sx={{ marginRight: '8px' }} />
              Nhóm khách hàng
            </div>
          </Grid>
        </ProFormHeader>
        <Grid container spacing={2} alignItems='center' justifyContent='center'>
          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormTextField
              name='name'
              placeholder={t('Tên nhóm')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormTextField
              name='description'
              placeholder={t('Mô tả')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={5.5}></Grid>
        </Grid>
      </ProFormContent>
    </ProForm>
  );
};

export default CustomerGroupInfo;
