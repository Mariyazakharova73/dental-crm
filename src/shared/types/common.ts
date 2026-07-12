export type EntityId = number;

export interface BaseEntity {
  id: EntityId;
}

export type ISODate = string; // "1990-05-15"
export type ISODateTime = string; // "2026-07-12T10:00:00"

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface ApiError {
  message: string;
  status?: number;
}

export type SortOrder = "asc" | "desc";

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export type ValueOf<T> = T[keyof T];

// export interface PaginationParams {
//   page: number;
//   limit: number;
// }

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
//   page: number;
//   limit: number;
// }

// export interface ListParams {
//   search?: string;
//   sortBy?: string;
//   sortOrder?: SortOrder;
// }

// export interface TableColumn<T> {
//   key: keyof T;
//   label: string;
//   sortable?: boolean;
// }

// export type Money = number;
