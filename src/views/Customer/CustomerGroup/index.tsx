import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import PageWrapper from '@/components/PageWrapper';
import { useTranslation } from 'react-i18next';
import CustomerGroupTable from './CustomerGroupTable';

const CustomerGroup = () => {
  const { t } = useTranslation();
  return (
    <PageWrapper title={t('Nhóm khách hàng')}>
      <PageBreadcrumbs
        title={t('Nhóm khách hàng')}
        items={[{ link: '/customers', text: 'Khách hàng' }]}
      />
      <CustomerGroupTable />
    </PageWrapper>
  );
};

export default CustomerGroup;
