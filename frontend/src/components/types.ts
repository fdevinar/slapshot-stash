export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  sortable: boolean;
}