import { useForm } from 'react-hook-form';
import { Alert, Box, Typography } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { ROUTE_PATH } from '@/constants/routes';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import useBoolean from '@/hooks/useBoolean';
import { setLocalToken } from '@/utils/AuthHelper';
import { getCurrentUser } from '@/services/user-service';
import { signIn } from '@/services/auth-service';
import { setProfile } from '@/slices/user';
import { useAppDispatch } from '@/store';
import Logger from '@/utils/Logger';
import _ from 'lodash';
import { LoadingButton } from '@mui/lab';
import { setIsAuth } from '@/slices/auth';
import useNotification from '@/hooks/useNotification';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/auth-schema';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import { useEffect, useState } from 'react';
import { SitemarkIcon } from '@/components/CustomIcons';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const { t } = useTranslation('auth');
  const [_loading, setLoading] = useBoolean();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotification();
  const [_hasErrors, setHasErrors] = useBoolean(false);

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit = async (values: LoginFormInputs) => {
    setLoading.on();
    try {
      const auth = await signIn({
        email: values.email,
        password: values.password,
      });
      if (auth.data?.accessToken) {
        setLocalToken.accessToken(auth.data.accessToken);
        const resp = await getCurrentUser();
        dispatch(setProfile(resp.data));
        dispatch(setIsAuth(true));
        setHasErrors.off();
        notify({
          message: t('login_success'),
          severity: 'success',
        });
        let route = ROUTE_PATH.HOME;
        if (!_.isNull(location.state) && location.state !== ROUTE_PATH.LOGIN) {
          route = location.state;
        }
        navigate(route);
      } else {
        throw new Error(auth.message);
      }
    } catch (error: any) {
      setHasErrors.on();
      Logger.log(error);
    } finally {
      setLoading.off();
    }
  };

  return (
    <>
      <SitemarkIcon />
      <Typography
        component='h1'
        variant='h4'
        fontWeight={500}
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        {' '}
        Sign in
      </Typography>
      {_hasErrors && (
        <Alert variant='filled' severity='warning'>
          Sorry, looks like there are some errors detected, please try again.
        </Alert>
      )}
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <ControllerTextField<LoginFormInputs>
          controllerProps={{
            name: 'email',
            defaultValue: '',
            control: control,
          }}
          textFieldProps={{
            label: 'Email',
            error: !!errors.email,
            helperText: errors.email?.message,
            sx: { ariaLabel: 'email' },
          }}
          prefixIcon={Email}
        />
        <ControllerTextField<LoginFormInputs>
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
        <Box display='flex' justifyContent='flex-end' alignItems='center' gap={3} flexWrap='wrap'>
          <Typography
            color='primary'
            component={RouterLink}
            to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.FORGOT_PASSWORD}`}
            sx={{ textAlign: 'end' }}
          >
            Forgot password?
          </Typography>
        </Box>
        <LoadingButton loading={_loading} type='submit' variant='contained' fullWidth>
          Login
        </LoadingButton>
        <Box display='flex' justifyContent='center' alignItems='center' flexWrap='wrap' gap={2}>
          <Typography>New on our platform?</Typography>
          <Typography
            to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.REGISTRATION}`}
            component={RouterLink}
            color='primary'
          >
            Create an account
          </Typography>
        </Box>
      </Box>
    </>
  );
}
