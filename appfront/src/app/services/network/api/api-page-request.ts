export interface ApiPageRequest {
  page: number;
  pageSize: number;
  search?: string;
  orderBy?: string;
  orderDirection?: '' | 'asc' | 'desc';
}
