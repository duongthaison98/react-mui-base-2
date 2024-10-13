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
import CustomerGroupInfo from './components/CustomerGroupInfo';
import { createCustomerGroupSchema } from './utils/schema';
import { CustomerGroupInfoType } from './utils/type';

const CreateCustomerGroup = () => {
  const { t } = useTranslation();
  const form = useForm<CustomerGroupInfoType>({
    mode: 'onChange',
    resolver: yupResolver(createCustomerGroupSchema),
    defaultValues: createCustomerGroupSchema.getDefault(),
  });
  return (
    <Page>
      <PageWrapper title={t('Thêm khách hàng')}>
        <PageBreadcrumbs
          title={t('Thêm nhóm khách hàng')}
          items={[
            { link: '/customers', text: 'Khách hàng' },
            { link: '/customers/customer-groups', text: 'Nhóm khách hàng' },
          ]}
        />

        <Stack direction='column'>
          <Stack direction='row' mb={2}>
            <Paper sx={{ width: '100%' }}>
              <CustomerGroupInfo form={form} />
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

export default CreateCustomerGroup;
