import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiltersRef } from 'types/refs';
import Validation from 'utils/Validation';
import { FilterParams } from '../utils/filters';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTime from 'utils/DateTime';
import ProForm from 'components/ProForm';
import { Collapse, Grid, Typography } from '@mui/material';
import ProDateRange from 'components/ProDateTime/ProDateRange';
import ProFormTextField from 'components/ProForm/ProFormTextField';
import ProFormSelect from 'components/ProForm/ProFormSelect';
import ProFormFilterAction from 'components/ProForm/ProFormFilterAction';

interface FilterValues {
  startDate: string | null;
  endDate: string | null;
  id: string;
  store: string | number | null;
  oldCustomer: string | number | null;
  billsId: string;
  status: string | number | null;
  note: string;
  COD: string;
}

const schema = Validation.shape({
  startDate: Validation.string().optional().default(null),
  endDate: Validation.string().optional().default(null),
  id: Validation.string().optional().default(''),
  billsId: Validation.string().optional().default(''),
  note: Validation.string().optional().default(''),
  COD: Validation.string().optional().default(''),
  store: Validation.select(0),
  oldCustomer: Validation.select(0),
  status: Validation.select(0),
});

interface Props {
  onSearch: (params: Partial<FilterParams>) => void;
  onSubmit: VoidFunction;
  onClear: VoidFunction;
}

const FiltersForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { t } = useTranslation();
  const { onSearch, onSubmit, onClear } = props;

  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);

  const form = useForm<FilterValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });
  const handleSubmit = (values: FilterValues) => {
    const { startDate, endDate, ...rest } = values;

    onSearch({
      ...rest,
      startDate: DateTime.Format(startDate),
      endDate: DateTime.Format(endDate),
    });
  };

  const handleReset = () => {
    form.reset(schema.getDefault());
  };

  const handleShowFilter = () => {
    setIsShowFilter(!isShowFilter);
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
    submit: form.handleSubmit(handleSubmit),
  }));
  return (
    <ProForm form={form} onFinish={handleSubmit} PaperProps={{ sx: { p: 2 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProDateRange
            label={t('Khoảng ngày')}
            from="startDate"
            to="endDate"
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2.4}>
          <ProFormTextField
            name="id"
            placeholder="ID"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormSelect
            name="store"
            placeholder={t('Cửa hàng')}
            options={[
              { value: 1, label: 'Hà Nội' },
              { value: 2, label: 'Sài Gòn' },
            ]}
            renderLabel={(option) => option.label}
            renderValue={(option) => option.value}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormSelect
            name="oldCustomer"
            placeholder={t('Khách hàng cũ')}
            options={[
              { value: 1, label: 'A' },
              { value: 2, label: 'B' },
            ]}
            renderLabel={(option) => option.label}
            renderValue={(option) => option.value}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormFilterAction
            onSubmit={onSubmit}
            onClear={onClear}
            onExpanded={handleShowFilter}
          />
        </Grid>
      </Grid>
      <Collapse in={isShowFilter} timeout="auto">
        <Grid container spacing={2} alignItems="center" mt={2}>
          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>ID hóa đơn</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormTextField
              name="billsId"
              placeholder={t('ID hóa đơn')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Trạng thái</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormSelect
              name="status"
              placeholder={t('Trạng thái')}
              options={[
                { value: 1, label: 'A' },
                { value: 2, label: 'B' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
					<Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Ghi chú</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormTextField
              name="note"
              placeholder={t('Ghi chú')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
					<Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Mã COD</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormTextField
              name="COD"
              placeholder={t('Mã COD')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Collapse>
    </ProForm>
  );
});

export default FiltersForm;
