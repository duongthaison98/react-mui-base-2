import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { Lock } from '@mui/icons-material';
import useBoolean from '@/hooks/useBoolean';
import { forgotPassword } from '@/services/auth-service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ROUTE_PATH } from '@/constants/routes';
import { useTranslation } from 'react-i18next';
import useNotification from '@/hooks/useNotification';
import { LoadingButton } from '@mui/lab';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '@/schemas/auth-schema';

interface IChangePasswordForm {
  password: string;
  confirmPassword: string;
}
export default function ChangePassword() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    getValues,
    trigger,
  } = useForm<IChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema),
  });
  const password = watch('password');
  const [searchParams] = useSearchParams();
  const [_loading, setLoading] = useBoolean(false);
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const notify = useNotification();
  const [_hasErrors, setHasErrors] = useBoolean(false);

  useEffect(() => {
    if (password && password?.length === getValues('confirmPassword')?.length) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  const onSubmit = (values: IChangePasswordForm) => {
    setLoading.on();
    forgotPassword({
      password: values.password,
      token: searchParams.get('token') || '',
    })
      .then((resp) => {
        if (resp.statusCode === axios.HttpStatusCode.Ok) {
          setHasErrors.off();
          notify({
            message: t('reset_password_successful'),
            severity: 'success',
          });
          navigate(`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.LOGIN}`);
        } else {
          throw new Error(resp.message);
        }
      })
      .catch((err) => {
        setHasErrors.on();
      })
      .finally(() => {
        setLoading.off();
      });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}
    >
      <Typography variant='h4' component='h1' gutterBottom>
        Change Password
      </Typography>
      {_hasErrors && (
        <Alert variant='filled' severity='warning'>
          Sorry, looks like there are some errors detected, please try again.
        </Alert>
      )}
      <ControllerTextField<IChangePasswordForm>
        controllerProps={{
          name: 'password',
          defaultValue: '',
          control: control,
        }}
        textFieldProps={{
          label: 'Password',
          type: 'password',
          error: !!errors.password,
          helperText: errors.password?.message,
        }}
        prefixIcon={Lock}
      />
      <ControllerTextField<IChangePasswordForm>
        controllerProps={{
          name: 'confirmPassword',
          defaultValue: '',
          control: control,
        }}
        textFieldProps={{
          label: 'Confirm Password',
          type: 'password',
          error: !!errors.confirmPassword,
          helperText: errors.confirmPassword?.message,
        }}
        prefixIcon={Lock}
      />
      <LoadingButton loading={_loading} type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
        Change Password
      </LoadingButton>
    </Box>
  );
}
