import CrudRepository from '../../lib/application/repository/crud';
export interface PackRepository<T> extends CrudRepository<T> {

  findById(id: string): T;

  create(item: T): T;

  findAll(): Promise<any>;

  update(id: string): T;

  delete(id: string): void;
}
export default PackRepository;