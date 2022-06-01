export class FindAllResponse<T> {
  readonly data: T[];
  readonly pageSize: number;
  readonly page: number;
  readonly total: number;
}
