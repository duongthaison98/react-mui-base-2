import Loadable from 'components/Loadable';
import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

const AccountingCash = Loadable(lazy(() => import('views/Accounting/Cash')));
const DailyIncome = Loadable(
  lazy(() => import('views/Report/AccountingInReportDaily'))
);
const AddCashTable = Loadable(lazy(() => import('views/Accounting/AddCash')));
const AddCashBookTable = Loadable(
  lazy(() => import('views/Accounting/CashBooks'))
);
const Accounting = Loadable(lazy(() => import('views/Accounting/Accounts')));
const AccountingDebtCustomer = Loadable(
  lazy(() => import('views/Accounting/Debt/Customer'))
);
const AccountingDebtSupplier = Loadable(
  lazy(() => import('views/Accounting/Debt/Supplier'))
);
const SumaryCashByStore = Loadable(
  lazy(() => import('views/Report/AccountingInReport/SumaryCashByStore'))
);
const TransactionIndex = Loadable(
  lazy(() => import('views/Accounting/TransactionIndex'))
);
const TransactionLog = Loadable(
  lazy(() => import('views/Accounting/TransactionLog'))
);
const TransactionCreate = Loadable(
  lazy(() => import('views/Accounting/TransactionCreate'))
);

const AccountRoute: RouteObject = {
  path: 'accounting',
  element: <Outlet />,
  children: [
    {
      path: 'cash',
      element: <AccountingCash />,
    },
    {
      path: 'cashbook',
      element: <AddCashBookTable />,
    },
    {
      path: 'accounts',
      element: <Accounting />,
    },

    {
      path: 'addcash',
      element: <AddCashTable />,
    },
    {
      path: 'debt',
      element: <Outlet />,
      children: [
        {
          path: 'customer',
          element: <AccountingDebtCustomer />,
        },
        {
          path: 'supplier',
          element: <AccountingDebtSupplier />,
        },
      ],
    },
    {
      path: 'report',
      element: <Outlet />,
      children: [
        {
          path: 'cash',
          element: <SumaryCashByStore />,
        },
        {
          path: 'daily',
          element: <DailyIncome />,
        },
      ],
    },
    {
      path: 'transaction',
      children: [
        {
          path: 'index',
          element: <TransactionIndex />,
        },
        {
          path: 'log',
          element: <TransactionLog />,
        },
        {
          path: 'create',
          element: <TransactionCreate />,
        },
      ],
    },
  ],
};

export default AccountRoute;
