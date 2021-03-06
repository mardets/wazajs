import CrudRepository from '../../lib/application/repository/crud';
export interface HomeRepository<T> extends CrudRepository<T> {

  findById(id: string): T;

  create(item: T): T;

  findAll(): Promise<T>;

  update(id: string): T;

  delete(id: string): void;
}