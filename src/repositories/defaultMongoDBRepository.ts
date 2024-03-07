import logger from '@src/logger';
import { BaseModel } from '@src/models';
import { CUSTOM_VALIDATION } from '@src/models/user';
import { Error, Model } from 'mongoose';
import { FilterOptions, WithId } from '.';
import {
  DatabaseInternalError,
  DatabaseUnknownClientError,
  DatabaseValidationError,
  Repository,
} from './repository';

export abstract class DefaultMongoDBRepository<
  T extends BaseModel
> extends Repository<T> {
  constructor(private model: Model<T>) {
    super();
  }

  async create(data: T): Promise<WithId<T>> {
    try {
      const model = new this.model(data);
      const createdData = await model.save();
      const createdDataWithId = createdData.toJSON() as WithId<T>;
      return createdDataWithId;
    } catch (error) {
      this.handleError(error);
      // Você pode considerar retornar algo aqui, dependendo dos requisitos
      throw error;
    }
  }

  // async findOne(options: FilterOptions) {
  //   try {
  //     const data = await this.model.findOne(options);
  //     return data?.toJSON<WithId<T>>();
  //   } catch (error) {
  //     this.handleError(error);
  //   }
  // }

  // async find(filter: FilterOptions) {
  //   try {
  //     const data = await this.model.find(filter);
  //     return data.map((d) => d.toJSON<WithId<T>>());
  //   } catch (error) {
  //     this.handleError(error);
  //   }
  // }
  async findOne(options: FilterOptions): Promise<WithId<T> | undefined> {
    try {
      const data = await this.model.findOne(options);
      return data ? (data.toJSON() as WithId<T>) : undefined;
    } catch (error) {
      this.handleError(error);
      // Pode ser útil retornar algo aqui, dependendo dos requisitos
      throw error;
    }
  }
  
  async find(filter: FilterOptions): Promise<WithId<T>[]> {
    try {
      const data = await this.model.find(filter);
      return data.map((d) => d.toJSON() as WithId<T>);
    } catch (error) {
      this.handleError(error);
      // Pode ser útil retornar algo aqui, dependendo dos requisitos
      throw error;
    }
  }  

  async deleteAll() {
    await this.model.deleteMany({});
  }

  protected handleError(error: unknown): never {
    if (error instanceof Error.ValidationError) {
      const duplicatedKindErrors = Object.values(error.errors).filter(
        (err) =>
          err.name === 'ValidatorError' &&
          err.kind === CUSTOM_VALIDATION.DUPLICATED
      );
      if (duplicatedKindErrors.length) {
        throw new DatabaseValidationError(error.message);
      }
      throw new DatabaseUnknownClientError(error.message);
    }
    logger.warn('Database error', error);
    throw new DatabaseInternalError(
      'Something unexpected happened to the database'
    );
  }
}
