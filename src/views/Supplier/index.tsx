import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Page from '@/components/Page';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import PageWrapper from '@/components/PageWrapper';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SupplierTable from './Supplier';
import SupplierProduct from './SupllierProduct';

// Tab components
const tabs = [
  {
    label: 'Nhà cung cấp',
    value: 'supplier',
    component: <SupplierTable />,
  },
  {
    label: 'Sản phẩm nhà cung cấp',
    value: 'supllier1',
    component: <SupplierProduct />,
  },
];

const ProductTab = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>('supplier');

  const handleChange = (_event: SyntheticEvent, tab: string) => {
    setValue(tab);
  };

  return (
    <PageWrapper title={t('Danh sách sản phẩm')}>
      <PageBreadcrumbs
        title={t('Danh sách sản phẩm')}
        items={[{ link: '/products', text: 'Sản phẩm' }]}
      />
      <TabContext value={value}>
        <Paper sx={{ display: 'grid', gridTemplateRows: 'auto auto 1fr' }}>
          <Tabs value={value} onChange={handleChange} variant='scrollable' scrollButtons='auto'>
            {tabs.map((tab, i) => (
              <Tab
                key={i}
                label={
                  <Typography variant='subtitle2' sx={{ textTransform: 'none' }}>
                    {tab.label}
                  </Typography>
                }
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider />
          {tabs.map((tab, i) => (
            <TabPanel key={i} value={tab.value} sx={{ p: 0 }}>
              <Page title={tab.label}>{tab.component}</Page>
            </TabPanel>
          ))}
        </Paper>
      </TabContext>
    </PageWrapper>
  );
};

export default ProductTab;
