export type EntityId = number;

export type Money = number;

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

export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortOrder = ValueOf<typeof SORT_ORDER>;

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export type ValueOf<T> = T[keyof T];

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}
