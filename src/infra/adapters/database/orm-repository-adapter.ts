export interface OrmRepositoryAdapter<T> {  
  getById(id: string): Promise<T>;
  find(params: any): Promise<T | null>;
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<T[]>
}