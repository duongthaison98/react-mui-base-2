import { Endpoints } from '@/constants/endpoints';
import type { HttpResponse } from '@/types/common';
import { CustomerGroup } from '@/types/customerGroup';
import HttpClient from '@/utils/HttpClient';

export const getCustomerGroups = (page: number, limit: number) => {
    return HttpClient.get<null, HttpResponse<{ items: CustomerGroup[], total: number, page: number, limit: number }>>(
      `${Endpoints.customerGroups.search}/search?page=${page}&limit=${limit}`
    );
  };