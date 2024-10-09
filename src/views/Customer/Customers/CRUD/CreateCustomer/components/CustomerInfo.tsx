import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import ProForm from 'components/ProForm';
import ProFormContent from 'components/ProForm/ProFormContent';
import ProFormDate from 'components/ProForm/ProFormDate';
import ProFormHeader from 'components/ProForm/ProFormHeader';
import ProFormSelect from 'components/ProForm/ProFormSelect';
import ProFormTextField from 'components/ProForm/ProFormTextField';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomerInfoType } from '../utils/type';
import ProFormCheckboxSelect from 'components/ProForm/ProFormCheckboxSelect';

interface Props {
  form: UseFormReturn<CustomerInfoType>;
}

const CustomerInfo = (props: Props) => {
  const { form } = props;
  const { t } = useTranslation();

  return (
    <ProForm form={form}>
      <ProFormContent m={2}>
        <ProFormHeader>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={6} md={4} lg={8}>
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <PersonIcon sx={{ marginRight: '8px' }} />
                Khách hàng
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ProFormSelect
                name="typeCustomer"
                placeholder={t('Loại khách')}
                options={[
                  { value: 1, label: 'Khách lẻ' },
                  { value: 2, label: 'Khách sỉ' },
                  { value: 3, label: 'Đại lý' },
                ]}
                renderLabel={(option) => option.label}
                renderValue={(option) => option.value}
              />
            </Grid>
          </Grid>
        </ProFormHeader>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormSelect
              name="group"
              placeholder={t('Nhóm khách hàng')}
              options={[
                { value: 1, label: 'Tất cả' },
                { value: 2, label: 'Đạt' },
                { value: 3, label: 'Không đạt' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormSelect
              name="province"
              placeholder={t('Thành phố')}
              options={[
                { value: 1, label: 'Hà Nội' },
                { value: 2, label: 'Đà Nẵng' },
                { value: 3, label: 'TP HCM' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormTextField
              name="name"
              placeholder={t('Họ tên')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormTextField
              name="address"
              placeholder={t('Địa chỉ')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormTextField
              name="code"
              placeholder={t('Mã khách hàng')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormTextField
              name="phoneNumber"
              placeholder={t('Điện thoại')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormDate name="birthDay" type="start" />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormSelect
              name="gender"
              placeholder={t('Giới tính')}
              options={[
                { value: 1, label: 'Nam' },
                { value: 2, label: 'Nữ' },
                { value: 3, label: 'Khác' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormSelect
              name="sellers"
              placeholder={t('NVPT')}
              options={[
                { value: 1, label: 'A' },
                { value: 2, label: 'B' },
                { value: 3, label: 'C' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormTextField
              name="debtLimit"
              placeholder={t('Giới hạn công nợ')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormTextField
              name="carer"
              placeholder={t('Người chăm sóc')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormSelect
              name="debtClassification"
              placeholder={t('Phân loại công nợ')}
              options={[
                { value: 1, label: 'A' },
                { value: 2, label: 'B' },
                { value: 3, label: 'C' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={5.5}>
            <ProFormCheckboxSelect
              name="store"
              placeholder={t('CHPT')}
              options={[
                { value: 1, label: 'Hà Nội' },
                { value: 2, label: 'Đà Nẵng' },
                { value: 3, label: 'Sài Gòn' },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={5.5}></Grid>
        </Grid>
      </ProFormContent>
    </ProForm>
  );
};

export default CustomerInfo;
