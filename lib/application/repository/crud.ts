interface CrudRepository<T, TId> {
  findById(id: TId): T;
  create(item: T): T;
  findAll(): T[];
  update(id: TId, item?: T): T;
  delete(id: TId): void;
}
export default CrudRepository;