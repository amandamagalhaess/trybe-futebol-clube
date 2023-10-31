export interface ICRUDModelReader<T> {
  findAll: () => Promise<T[]>;
}
