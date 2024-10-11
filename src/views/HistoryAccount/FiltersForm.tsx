import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import { nanoid } from '@reduxjs/toolkit';
import ProDateRange from '@/components/ProDateTime/ProDateRange';
import ProForm from '@/components/ProForm';
import ProFormSelect from '@/components/ProForm/Label/ProFormSelect';
import ProFormTextField from '@/components/ProForm/Label/ProFormTextField';
import ProFormCheckboxSelect from '@/components/ProForm/ProFormCheckboxSelect';
import ProFormFilterAction from '@/components/ProForm/ProFormFilterAction';
import ProFormHiddenInput from '@/components/ProForm/ProFormHiddenInput';
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
        <Grid item xs={12} sm={6} md={4} lg={2.0}>
          <ProFormCheckboxSelect
            name='store'
            label={t('Cửa hàng')}
            placeholder={t('Chọn cửa hàng')}
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
        <Grid item xs={6} sm={3} md={2} lg={1.2}>
          <ProFormTextField
            name='name1'
            placeholder={t('ID XNK')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={1.2}>
          <ProFormTextField
            name='name'
            placeholder={t('ID Hóa đơn')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2} lg={1.2}>
          <ProFormSelect
            name='inventory1'
            placeholder={t('- Kiểu log -')}
            options={[
              { value: 1, label: '- Kiểu log -' },
              { value: nanoid(), label: 'Sửa XNK' },
              { value: nanoid(), label: 'Xóa XNK' },
            ]}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={1.2}>
          <ProFormSelect
            name='inventory2'
            placeholder={t('- Loại-')}
            options={[
              { value: 1, label: '- Loại-' },
              { value: nanoid(), label: 'Nhập' },
              { value: nanoid(), label: 'Xuất' },
            ]}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={1.2}>
          <ProFormSelect
            name='inventory3'
            placeholder={t('- Kiểu-')}
            options={[
              { value: 1, label: '- Kiểu-' },
              { value: nanoid(), label: '[N] Nhà cung cấp' },
              { value: nanoid(), label: '[C] Chuyển kho' },
              { value: nanoid(), label: '[G] Giao hàng' },
              { value: nanoid(), label: '[B] Bán sỉ' },
              { value: nanoid(), label: '[T] Tặng kèm' },
              { value: nanoid(), label: '[B] Bán lẻ' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.0}>
          <ProDateRange label={t('Ngày tạo')} from='startDate' to='endDate' />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.0}>
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
          <StyledLabel item xs={12} sm={6} md={4} lg={1}>
            Sản phẩm
          </StyledLabel>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <ProFormTextField name='brand' />
          </Grid>

          <StyledLabel item xs={12} sm={6} md={4} lg={1}>
            Ngày tạo
          </StyledLabel>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <ProDateRange label={t('Từ - Đến')} from='startDate' to='endDate' />
          </Grid>
          <StyledLabel item xs={12} sm={6} md={4} lg={1}>
            Người sửa/Xóa
          </StyledLabel>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <ProFormTextField name='brand' />
          </Grid>
        </Grid>
      )}

      <ProFormHiddenInput />
    </ProForm>
  );
});

const StyledLabel = styled(Grid)`
  text-align: right;
`;

export default FiltersForm;
