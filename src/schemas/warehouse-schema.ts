import { boolean, object, string } from 'yup';

export const createWarehouseSchema = object().shape({
  name: string().email().required('Username is required'),
  address: string().required('Password is required'),
  active: boolean(),
});
