import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OrmRepositoryAdapter } from './orm-repository-adapter';

@Injectable()
export class TypeOrmRepositoryAdapter<T> implements OrmRepositoryAdapter<T> {
  constructor(private readonly repository: Repository<T>) {}
  find(params: any): Promise<T | null> {
    return this.repository.findOne(params);
  }
  getById(id: string): Promise<T> {
    const options = {
      where: { id } as any
    };
    return this.repository.findOne(options);
  }
  save(entity: T): Promise<void> {
    this.repository.save(entity);
    return;
  }
  update(entity: T): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  
}
