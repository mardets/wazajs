export default interface CrudRepository<T> {
  findById(id: string): T;
  create(item: T): T;
  findAll(): Promise<any>;
  update(id: string, item?: T): T;
  delete(id: string): void;
}
