import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { Email } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import { ROUTE_PATH } from '@/constants/routes';
import useBoolean from '@/hooks/useBoolean';
import { useEffect, useState } from 'react';
import { verifyEmail } from '@/services/auth-service';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { emailValidateSchema } from '@/schemas/auth-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';

const forgotPasswordSchema = object().shape({
  email: emailValidateSchema,
});

type ForgotPasswordFormInputs = {
  email: string;
};
export default function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const [_loading, setLoading] = useBoolean(false);
  const navigate = useNavigate();
  const [_hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit = async (values: ForgotPasswordFormInputs) => {
    setLoading.on();
    try {
      const resp = await verifyEmail(values);
      if (resp.statusCode === axios.HttpStatusCode.Ok) {
        setHasErrors(false);
      } else {
        throw new Error(resp.message);
      }
    } catch (error: any) {
      setHasErrors(true);
    } finally {
      setLoading.off();
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant='body1' sx={{ mb: 2 }}>
        Enter your email address and we'll send you a link to reset your password.
      </Typography>

      {_hasErrors === true && (
        <Alert variant='filled' severity='warning'>
          Sorry, looks like there are some errors detected, please try again.
        </Alert>
      )}

      {_hasErrors === false && (
        <Alert variant='filled' severity='success'>
          Sent password reset. Please check your email
        </Alert>
      )}

      <ControllerTextField<ForgotPasswordFormInputs>
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
      <LoadingButton loading={_loading} type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
        Submit
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
