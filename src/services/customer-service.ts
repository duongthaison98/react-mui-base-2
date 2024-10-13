import { Endpoints } from '@/constants/endpoints';
import type { HttpResponse } from '@/types/common';
import type { CustomersRequest, ListCustomerResponse } from '@/types/customer-types';
import HttpClient from '@/utils/HttpClient';

export const getCustomers = (request: CustomersRequest) => {
    return HttpClient.get<null, HttpResponse<ListCustomerResponse>>(
      `${Endpoints.customer.search}`,
      {
        params: {
          page: request.page,
          limit: request.limit,
          search: request.search ? request.search : null,
          sort: request.sort ? request.sort : null,
          ...request.filter,
        },
      }
    );
  };