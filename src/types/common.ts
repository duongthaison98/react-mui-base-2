export interface Dictionary<T = any> {
  [key: string]: T;
}

export type SortDirection = 'asc' | 'desc';

export type PickUnion<T> = { [K in keyof T]: Pick<T, K> }[keyof T];

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: {
    [key: string]: SortDirection;
  };
  search?: string | null;
}

export interface HttpResponse<T = any> {
  data: T | null;
  message: string;
  statusCode: number;
}
