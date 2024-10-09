import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Grid } from '@mui/material';
import ActionButton from 'components/ProButton/ActionButton';
import DialogContainer from 'components/ProDialog/DialogContainer';
import DialogContent from 'components/ProDialog/DialogContent';
import DialogFooter from 'components/ProDialog/DialogFooter';
import DialogHeader from 'components/ProDialog/DialogHeader';
import ProForm from 'components/ProForm';
import ProFormAutocomplete from 'components/ProForm/ProFormAutocomplete';
import ProFormCheckboxSelect from 'components/ProForm/ProFormCheckboxSelect';
import ProFormTextField from 'components/ProForm/ProFormTextField';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TypedObject from 'utils/TypedObject';
import Validation from 'utils/Validation';

interface FormValues {
  note: string;
}

const schema = Validation.shape({
  note: Validation.string().optional(),
});

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateDialog = (props: Props) => {
  const { open, onClose } = props;
  const { t } = useTranslation();

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });
  useEffect(() => {
    form.reset({});
  }, [form]);

  const handleReset = () => {
    onClose();
  };

  const handleSubmit = async (values: FormValues) => {
    handleReset();
  };

  return (
    <DialogContainer open={open} onClose={handleReset} maxWidth="md" fullWidth>
      <ProForm<FormValues> form={form} onFinish={handleSubmit}>
        <DialogHeader title={t('Khai báo đơn vị vận chuyển')} />
        <DialogContent>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={12} lg={6}>
              <ProFormAutocomplete
                name="acv"
                options={[{ id: 1, label: '123' }]}
                renderValue={(item) => item.id}
                renderLabel={(item) => item.label}
                placeholder={'Cửa hàng'}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <ProFormCheckboxSelect
                name="store"
                placeholder={t('Khách hàng')}
                options={[
                  { value: 1, label: 'Chưa gắn kho' },
                  { value: 2, label: 'Linh kiện Sài Gòn' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <ProFormTextField
                name="store"
                placeholder={t('Tên đơn vị vận chuyển')}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <ProFormTextField name="store" placeholder={t('Số điện thoại')} />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <ProFormAutocomplete
                name="acv"
                options={[{ id: 1, label: '123' }]}
                renderValue={(item) => item.id}
                renderLabel={(item) => item.label}
                placeholder={'Đơn vận chuyển'}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <ProFormCheckboxSelect
                name="store"
                placeholder={t('Nhân viên giao hàng')}
                options={[
                  { value: 1, label: 'Chưa gắn kho' },
                  { value: 2, label: 'Linh kiện Sài Gòn' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <Checkbox />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <ProFormCheckboxSelect
                name="store"
                placeholder={t('Trạng thái')}
                options={[
                  { value: 1, label: 'Chưa gắn kho' },
                  { value: 2, label: 'Linh kiện Sài Gòn' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}></Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <ProFormTextField
                name="note"
                placeholder="Ghi chú"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogFooter>
          <ActionButton actionType="cancel" onClick={handleReset}>
            {t('Hủy')}
          </ActionButton>
          <ActionButton
            type="submit"
            disabled={TypedObject.isExist(form.formState.errors)}
          >
            {t('OK')}
          </ActionButton>
        </DialogFooter>
      </ProForm>
    </DialogContainer>
  );
};

export default CreateDialog;
