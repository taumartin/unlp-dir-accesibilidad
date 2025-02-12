export interface ApiResponsePage<T> {
  totalRecords: number;
  filteredRecords: number;
  totalPages: number;
  page: number;
  pageSize: number;
  data: T[];
}
