import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper/Paper';
import Stack from '@mui/material/Stack';
import Page from '@/components/Page';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import PageWrapper from '@/components/PageWrapper';
import ActionButton from '@/components/ProButton/ActionButton';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CustomerInfo from './components/CustomerInfo';
import GenerallyInfo from './components/GenerallyInfo';
import Tag from './components/Tag';
import { createCustomerSchema } from './utils/schema';
import { CustomerInfoType } from './utils/type';

const CreateCustomer = () => {
  const { t } = useTranslation();
  const form = useForm<CustomerInfoType>({
    mode: 'onChange',
    resolver: yupResolver(createCustomerSchema),
    defaultValues: createCustomerSchema.getDefault(),
  });
  return (
    <Page>
      <PageWrapper title={t('Thêm khách hàng')}>
        <PageBreadcrumbs
          title={t('Thêm khách hàng')}
          items={[{ link: '/customers', text: 'Khách hàng' }]}
        />

        <Stack direction='column'>
          <Stack direction='row' mb={2}>
            <Paper sx={{ width: '100%' }}>
              <CustomerInfo form={form} />
            </Paper>
          </Stack>
          <Box m={2.5}>
            <ActionButton variant='contained' color='success' actionType='save'>
              Lưu
            </ActionButton>
          </Box>
        </Stack>
      </PageWrapper>
    </Page>
  );
};

export default CreateCustomer;
