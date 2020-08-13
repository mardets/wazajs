import CrudRepository from '../lib/application/repository/crud';
export interface <%= upCaseName %>Repository<T> extends CrudRepository<T> {

  findById(id: string): T;

  create(item: T): T;

  findAll(): T[];

  update(id: string): T;

  delete(id: string): void;
}
export default <%= upCaseName %>Repository;