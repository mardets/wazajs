import CrudRepository from '../../lib/application/repository/crud';
export interface HomeRepository<T, TId> extends CrudRepository<T, TId> {

  findById(id: TId): T;

  create(item: T): T;

  findAll(): T[];

  update(id: TId): T;

  delete(id: TId): void;
}