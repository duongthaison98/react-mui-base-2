import { yupResolver } from '@hookform/resolvers/yup';
import { TabContext, TabPanel } from '@mui/lab';
import { Grid } from '@mui/material';
import ProForm from 'components/ProForm';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Validation from 'utils/Validation';
import SelectedStoreDialog from './SelectedStoreDialog';

import BillSale from './BillSale';
import Header from './components/Header';

interface IForm {}
const schema = Validation.shape({});

const Index = () => {
  // const { t } = useTranslation();
  const form = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });
  const [tab, setTab] = useState<string>('0');
  const [ids, setIds] = useState<number[]>([1]);

  const [openDialogSelectedStore, setOpenDialogSelectedStore] =
    useState<boolean>(false);

  const handleSubmit = () => {};

  const handleAddTab = () => {
    setIds([...ids, ids[ids.length - 1] + 1]);
  };
  const handleRemoveTab = (id: number) => {};
  const addItem = () => {};
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    // handleSaveCurrentTab(newValue);
    setTab(newValue);
  };

  return (
    <ProForm form={form} onFinish={handleSubmit} PaperProps={{ sx: { p: 2 } }}>
      <Grid
        container
        spacing={2}
        sx={{ paddingTop: '5px', background: '#fff' }}
      >
        <TabContext value={tab}>
          <Header
            tab={tab}
            ids={ids}
            handleAddTab={handleAddTab}
            handleRemoveTab={handleRemoveTab}
            handleChange={handleChange}
            addItem={addItem}
            openDialogSelectedStore={() => {
              setOpenDialogSelectedStore(!openDialogSelectedStore);
            }}
          />
          {ids.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <TabPanel
                  value={index.toString()}
                  sx={{ padding: '0 24px 24px 24px' }}
                >
                  <BillSale />
                </TabPanel>
              </React.Fragment>
            );
          })}
        </TabContext>
      </Grid>
      <SelectedStoreDialog
        open={openDialogSelectedStore}
        onClose={() => {
          setOpenDialogSelectedStore(!openDialogSelectedStore);
        }}
      />
    </ProForm>
  );
};

export default Index;
