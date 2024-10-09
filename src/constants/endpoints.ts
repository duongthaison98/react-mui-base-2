export const Endpoints = {
  auth: {
    login: '/login',
    logout: '/logout',
  },
  products: {
    search: '/product/search',
    detail: '/product/detail',
    create: '/product/create',
    update: '/product/update',
    disable: '/product/disable',
    delete: '/product/delete',
  },
} as const;
