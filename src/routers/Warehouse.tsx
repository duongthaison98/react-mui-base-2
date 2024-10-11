import Loadable from '@/components/Loadable';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// Products
const List = Loadable(lazy(() => import('@/views/Warehouse')));
const WarehouseTable = Loadable(lazy(() => import('@/views/Warehouse/CreateWarehouse')));
const AddTicket = Loadable(lazy(() => import('@/views/Warehouse/AddTicket')));
const CheckBroser = Loadable(lazy(() => import('@/views/Warehouse/DraftTicket/Browserss')));
const ConfirmDraft = Loadable(lazy(() => import('@/views/Warehouse/DraftTicket/Confirms')));
const CreareDraft = Loadable(lazy(() => import('@/views/Warehouse/DraftTicket/CreateDraft')));

const Warehouse: RouteObject = {
  path: 'warehouse',
  element: <Outlet />,
  children: [
    { index: true, element: <List /> },
    { path: 'create', element: <WarehouseTable /> },
    { path: 'add', element: <AddTicket /> },
    { path: 'browser', element: <CheckBroser /> },
    { path: 'confirm', element: <ConfirmDraft /> },
    { path: 'draft', element: <CreareDraft /> },
  ],
};

export default Warehouse;
