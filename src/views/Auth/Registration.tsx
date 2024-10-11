import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import useBoolean from '@/hooks/useBoolean';
import { signOut, signUp } from '@/services/auth-service';
import { ROUTE_PATH } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import useNotification from '@/hooks/useNotification';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '@/schemas/auth-schema';

interface RegistrationFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setFocus,
    trigger,
  } = useForm<RegistrationFormInputs>({
    resolver: yupResolver(registrationSchema),
  });
  const password = watch('password');
  const [_loading, setLoading] = useBoolean();
  const navigate = useNavigate();
  const notify = useNotification();
  const { t } = useTranslation('auth');

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  useEffect(() => {
    if (password && password?.length === getValues('confirmPassword')?.length) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  const onSubmit = async (values: RegistrationFormInputs) => {
    setLoading.on();
    signUp(values)
      .then(() => {
        notify({
          message: t('registration_success'),
          severity: 'success',
        });
        navigate(`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.LOGIN}`);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading.off();
      });
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h4' component='h1' gutterBottom>
        Register
      </Typography>
      <ControllerTextField<RegistrationFormInputs>
        controllerProps={{
          name: 'email',
          defaultValue: '',
          control: control,
        }}
        textFieldProps={{
          label: 'Email',
          error: !!errors.email,
          helperText: errors.email?.message,
        }}
        prefixIcon={Email}
      />
      <ControllerTextField<RegistrationFormInputs>
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
      <ControllerTextField<RegistrationFormInputs>
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
        Register
      </LoadingButton>
      <Button
        onClick={() => navigate(`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.LOGIN}`)}
        variant='outlined'
        fullWidth
        sx={{ mt: 2 }}
      >
        Back to login
      </Button>
    </Box>
  );
}
