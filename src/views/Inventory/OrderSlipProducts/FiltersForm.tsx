import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import { nanoid } from '@reduxjs/toolkit';
import ProDateRange from '@/components/ProDateTime/ProDateRange';
import ProForm from '@/components/ProForm';
import ProFormTextField from '@/components/ProForm/Label/ProFormTextField';
import ProFormFilterAction from '@/components/ProForm/ProFormFilterAction';
import ProFormHiddenInput from '@/components/ProForm/ProFormHiddenInput';
import ProFormSelect from '@/components/ProForm/ProFormSelect';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FiltersRef } from '@/types/refs';
import Validation from '@/utils/Validation';
import { STATUS } from './utils/constants';
import type { FilterParams } from './utils/filters';

interface FilterValues {
  searchText: string;
  status: number;
}

const schema = Validation.shape({
  name: Validation.string().optional(),
  status: Validation.select(STATUS.ALL),
  inventory: Validation.select(1),
});

interface Props {
  onSearch: (params: Partial<FilterParams>) => void;
  onSubmit: VoidFunction;
  onClear: VoidFunction;
}

const FiltersForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { onSearch, onSubmit, onClear } = props;
  const { t } = useTranslation();
  const [openMoreFilter, setOpenMoreFilter] = useState<boolean>(false);

  const form = useForm<FilterValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: FilterValues) => {
    onSearch(values);
  };

  const handleReset = () => {
    form.reset(schema.getDefault());
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
    submit: form.handleSubmit(handleSubmit),
  }));

  const onExpanded = () => setOpenMoreFilter(!openMoreFilter);

  return (
    <ProForm form={form} onFinish={handleSubmit} PaperProps={{ sx: { p: 2 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProDateRange label={t('Từ - Đến')} from='startDate' to='endDate' />
        </Grid>

        <Grid item xs={6} sm={3} md={2} lg={1.2}>
          <ProFormTextField
            name='name'
            placeholder={t('ID yêu cầu XNK')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormTextField
            name='name'
            placeholder={t('Tên người phụ trách')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormTextField
            name='name'
            placeholder={t('Tên sản phẩm')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormTextField
            name='name'
            placeholder={t('Tên NCC')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2} lg={1.2}>
          <ProFormFilterAction
            onSubmit={onSubmit}
            onClear={onClear}
            onExpanded={onExpanded}
            openMoreFilter={openMoreFilter}
          />
        </Grid>
      </Grid>

      {openMoreFilter && (
        <Grid container spacing={1} columnSpacing={3} mt={2} alignItems='center'>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <ProFormSelect
              name='store'
              placeholder={t('Loại')}
              options={[
                { value: nanoid(), label: 'Chưa thực thi' },
                { value: nanoid(), label: 'Đã thực thi' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2} lg={1.2}>
            <ProFormTextField
              name='name'
              placeholder={t('Số lô')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <ProFormSelect
              name='store'
              placeholder={t('Cửa hàng')}
              options={[
                { value: nanoid(), label: 'TM' },
                { value: nanoid(), label: 'HN-1' },
                { value: nanoid(), label: 'HN-2' },
                { value: nanoid(), label: 'Sài Gòn' },
                { value: nanoid(), label: 'Hàng trên đường' },
                { value: nanoid(), label: 'Thái nguyên' },
                { value: nanoid(), label: 'Vinh' },
                { value: nanoid(), label: 'Màn hình' },
                { value: nanoid(), label: 'VTech Thanh Hóa' },
                { value: nanoid(), label: 'Linh Kiện HN' },
                { value: nanoid(), label: 'Xe TH' },
                { value: nanoid(), label: 'Anh Vương' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <ProFormSelect
              name='store'
              placeholder={t('Trạng thái phiếu')}
              options={[
                { value: nanoid(), label: 'Đã hoàn thành' },
                { value: nanoid(), label: 'Chưa hoàn thành' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <ProFormSelect
              name='store'
              placeholder={t('Loại sản phẩm')}
              options={[
                { value: nanoid(), label: 'Chưa thực thi' },
                { value: nanoid(), label: 'Đã thực thi' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
        </Grid>
      )}

      <ProFormHiddenInput />
    </ProForm>
  );
});

export default FiltersForm;
