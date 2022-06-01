export interface EntityDao<T, M, P> {
  findAll(pagination?: P): Promise<{ rows: Array<M>; total: number }>;
  create(data: T): Promise<M>;
  remove(id: string): Promise<M>;
  patchUpdate(id: string, data: M): Promise<M>;
  putUpdate(id: string, data: M): Promise<M>;
  findOne(id: string): Promise<M>;
}
