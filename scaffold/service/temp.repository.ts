import CrudRepository from '../lib/application/repository/crud';
export interface <%= upCaseName %>Repository<T, TId> extends CrudRepository<T, TId> {

  findById(id: TId): T;

  create(item: T): T;

  findAll(): T[];

  update(id: TId): T;

  delete(id: TId): void;
}
export default <%= upCaseName %>Repository;