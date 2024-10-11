import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Collapse } from '@mui/material';
import Grid from '@mui/material/Grid';
import ProDateRange from '@/components/ProDateTime/ProDateRange';
import ProForm from '@/components/ProForm';
import ProFormAutocomplete from '@/components/ProForm/Label/ProFormAutocomplete';
import ProFormTextField from '@/components/ProForm/Label/ProFormTextField';
import ProFormFilterAction from '@/components/ProForm/ProFormFilterAction';
// import ProFormHiddenInput from '@/components/ProForm/ProFormHiddenInput';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FiltersRef } from '@/types/refs';
// import DateFns from '@/utils/DateFns';
import { nanoid } from '@reduxjs/toolkit';
import ProFormCheckboxSelect from '@/components/ProForm/ProFormCheckboxSelect';
import Validation from '@/utils/Validation';
import type { FilterParams } from './utils/filters';

interface FilterValues {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  product: string;
  customer: string;
  idBill: string;
}

const schema = Validation.shape({
  name: Validation.string().optional(),
  startDate: Validation.date().optional(),
  endDate: Validation.date().optional(),
  product: Validation.string().optional(),
  customer: Validation.string().optional(),
  idBill: Validation.string().optional(),
});

interface Props {
  onSearch: (params: Partial<FilterParams>) => void;
  onSubmit: VoidFunction;
  onClear: VoidFunction;
}

const FiltersForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { onSearch, onSubmit, onClear } = props;
  const { t } = useTranslation();
  const [collapseFilter, setcollapseFilter] = useState<boolean>(false);

  const form = useForm<FilterValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: FilterValues) => {
    const { startDate, endDate, ...rest } = values;

    onSearch({
      ...rest,
      // startDate: DateFns.StartOfDayToISOString(startDate),
      // endDate: DateFns.EndOfDayToISOString(endDate),
    });
  };

  const handleReset = () => {
    form.reset(schema.getDefault());
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
    submit: form.handleSubmit(handleSubmit),
  }));

  return (
    <ProForm form={form} onFinish={handleSubmit} PaperProps={{ sx: { p: 2 } }}>
      {/* filter */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProFormCheckboxSelect
            name='store'
            placeholder={t('Chọn cửa hàng')}
            options={[
              { value: nanoid(), label: 'TM' },
              { value: nanoid(), label: 'HN-1' },
              { value: nanoid(), label: 'HN-2' },
              { value: nanoid(), label: 'Sài Gòn' },
              { value: nanoid(), label: 'VTech Thanh Hóa' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1}>
          <ProFormTextField
            name='name'
            placeholder={t('ID hóa đơn')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProDateRange label='' from='startDate' to='endDate' />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProFormTextField
            name='customer'
            placeholder={t('Khách hàng')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProFormTextField
            name='product'
            placeholder={t('Sản phẩm')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1}>
          <ProFormFilterAction
            onSubmit={onSubmit}
            onClear={onClear}
            onExpanded={() => setcollapseFilter(!collapseFilter)}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={3} lg={1.5}>
          <Button size='medium' color='info'>
            {t('Check số liệu')}
          </Button>
        </Grid>
      </Grid>
      {/* <ProFormHiddenInput /> */}
      {/* advance filter */}
      <Collapse in={collapseFilter} timeout='auto'>
        <Grid container spacing={2} style={{ marginTop: 1 }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProFormTextField
              name='name'
              placeholder={t('NV thu ngân')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProFormTextField
              name='customer'
              placeholder={t('Mã Coupon')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* 2 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProFormTextField
              name='name'
              placeholder={t('IMEI')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProFormAutocomplete
              name='store'
              placeholder={t('Chọn danh mục')}
              options={[
                { value: 1, label: 'TM' },
                { value: 2, label: 'HN-1' },
                { value: 3, label: 'HN-2' },
                { value: 4, label: 'Sài Gòn' },
                { value: 5, label: 'VTech Thanh Hóa' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProFormTextField
              name='name'
              placeholder={t('NV bán hàng')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProFormTextField
              name='customer'
              placeholder={t('Mô tả')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* 3 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProFormTextField
              name='name'
              placeholder={t('NV kỹ thuật')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProFormTextField
              name='customer'
              placeholder={t('Nguồn khách hàng')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        {/* 4 */}
      </Collapse>
    </ProForm>
  );
});

export default FiltersForm;
