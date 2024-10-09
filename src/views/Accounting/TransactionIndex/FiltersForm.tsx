import { yupResolver } from '@hookform/resolvers/yup';
import ProForm from 'components/ProForm';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiltersRef } from 'types/refs';
import Validation from 'utils/Validation';
import DateTime from 'utils/DateTime';
import { Grid } from '@mui/material';
import { FilterParams } from './utils/filters';
import ProFormCheckboxSelect from 'components/ProForm/ProFormCheckboxSelect';
import ProFormTextField from 'components/ProForm/Label/ProFormTextField';
import { useTranslation } from 'react-i18next';
import ProFormSelect from 'components/ProForm/Label/ProFormSelect';
import ProDateRange from 'components/ProDateTime/ProDateRange';
import { Button, ButtonGroup, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface FilterValues {
  id: string;
  dayType: number;
  startDate: Date | null;
  endDate: Date | null;
  document: number;
  documentId: string;
  amount: string;

  billType: number;
  type: number;

  planningType: number;
  accountCode: string;
  object: string;
  objectType: number;
  note: string;
  creator: string;
}

const schema = Validation.shape({
  id: Validation.string().optional(),
  dayType: Validation.select(0),
  startDate: Validation.date().optional(),
  endDate: Validation.date().optional(),
  document: Validation.select(0),
  documentId: Validation.string().optional(),
  amount: Validation.string().optional(),
  billType: Validation.select(0),
  type: Validation.select(0),
  planningType: Validation.select(0),
  accountCode: Validation.string().optional(),
  object: Validation.string().optional(),
  objectType: Validation.select(0),
  note: Validation.string().optional(),
  creator: Validation.string().optional(),
});

interface Props {
  onSearch: (params: Partial<FilterParams>) => void;
}

const FiltersForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { t } = useTranslation();
  const { onSearch } = props;
  const [openExpand, setOpenExpand] = useState<boolean>(false);

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

  const handleExpand = () => {
    setOpenExpand((isOp) => !isOp);
  };

  return (
    <ProForm
      form={form}
      onFinish={handleSubmit}
      PaperProps={{ sx: { padding: '16px 16px 0 16px' } }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} lg={1.7}>
          <ProFormCheckboxSelect
            name="store"
            label={t('Cửa hàng')}
            placeholder={t('Của hàng')}
            options={[
              { value: 1, label: 'Chưa gắn kho' },
              { value: 2, label: 'Linh kiện Sài Gòn' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={0.8}>
          <ProFormTextField
            name="id"
            label={t('ID')}
            placeholder={t('ID')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <ProFormSelect
            name="dayType"
            label={t('Kiểu ngày')}
            placeholder={t('Kiểu ngày')}
            options={[
              { value: 0, label: '-Kiểu ngày-' },
              { value: 1, label: 'Ngày giao dịch' },
              { value: 2, label: 'Ngày tạo' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.8}>
          <ProDateRange label={t('Chọn ngày')} from="startDate" to="endDate" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.2}>
          <ProFormSelect
            name="document"
            label={t('Chứng từ')}
            placeholder={t('Chứng từ')}
            options={[
              { value: 0, label: '-Chứng từ-' },
              { value: 1, label: 'Có' },
              { value: 2, label: 'Không' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1}>
          <ProFormTextField
            name="documentId"
            label={t('ID chứng từ')}
            placeholder={t('ID chứng từ')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <ProFormTextField
            name="amount"
            label={t('Số tiền')}
            placeholder={t('Số tiền')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button type="submit" fullWidth>
              Lọc
            </Button>
            <Button
              variant="contained"
              endIcon={openExpand ? <ExpandLess /> : <ExpandMore />}
              onClick={handleExpand}
              size="medium"
            />
          </ButtonGroup>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Collapse in={openExpand} timeout="auto">
            <Grid container spacing={2} pt={1}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ProFormSelect
                  name="billType"
                  label={t('Loại phiếu')}
                  placeholder={t('Loại phiếu')}
                  options={[
                    { value: 0, label: '-Loại phiếu-' },
                    { value: 1, label: 'Phiếu thu' },
                    { value: 2, label: 'Phiếu chi' },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ProFormSelect
                  name="planningType"
                  label={t('Loại hạch toán')}
                  placeholder={t('Loại hạch toán')}
                  options={[
                    { value: 0, label: '-Loại hạch toán-' },
                    { value: 1, label: 'Tự động' },
                    { value: 2, label: 'Không tự động' },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ProFormSelect
                  name="objectType"
                  label={t('Loại đối tượng')}
                  placeholder={t('Loại đối tượng')}
                  options={[
                    { value: 0, label: '-Loại đối tượng-' },
                    { value: 1, label: 'Khách hàng' },
                    { value: 2, label: 'Nhà cung cấp' },
                    { value: 3, label: 'Nhân viên' },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <ProFormTextField
                  name="note"
                  label={t('Ghi chú')}
                  placeholder={t('Ghi chú')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <ProFormSelect
                  name="type"
                  label={t('Kiểu')}
                  placeholder={t('Kiểu')}
                  options={[
                    { value: 0, label: '-Kiểu-' },
                    { value: 1, label: 'Nhập nhà cung cấp' },
                    { value: 2, label: 'Nhập nhà cung cấp VAT' },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <ProFormTextField
                  name="accountCode"
                  label={t('Mã tài khoản')}
                  placeholder={t('Mã tài khoản')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ProFormTextField
                  name="object"
                  label={t('Đối tượng')}
                  placeholder={t('Đối tượng')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ProFormTextField
                  name="creator"
                  label={t('Người tạo')}
                  placeholder={t('Người tạo')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    </ProForm>
  );
});

export default FiltersForm;
