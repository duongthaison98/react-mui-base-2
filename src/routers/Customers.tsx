import Loadable from '@/components/Loadable';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// Customers
const List = Loadable(lazy(() => import('@/views/Customer/Customers')));
const Create = Loadable(lazy(() => import('@/views/Customer/Customers/CRUD/CreateCustomer')));
const CreateGroup = Loadable(
  lazy(() => import('@/views/Customer/CustomerGroup/CRUD/CreateCustomerGroup')),
);
const CustomerInfo = Loadable(lazy(() => import('@/views/Customer/Customers/CustomerInfo')));
const CustomerGroup = Loadable(lazy(() => import('@/views/Customer/CustomerGroup')));
const FormCare = Loadable(lazy(() => import('@/views/Customer/FormCare.tsx')));
const ReasonCare = Loadable(lazy(() => import('@/views/Customer/ReasonCare.tsx')));

const Customers: RouteObject = {
  path: 'customers',
  element: <Outlet />,
  children: [
    { index: true, element: <List /> },
    { path: 'create', element: <Create /> },
    { path: 'customer-info', element: <CustomerInfo /> },
    { path: 'create-group', element: <CreateGroup /> },
    { path: 'customer-groups', element: <CustomerGroup /> },
    { path: 'form-of-care', element: <FormCare /> },
    { path: 'reason-for-care', element: <ReasonCare /> },
  ],
};

export default Customers;
