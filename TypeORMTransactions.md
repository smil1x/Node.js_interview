## Basic Definitions:
1) Transaction - a database transaction symbolizes a unit of work performed within a database management system against a database and treated as a whole (transaction generally represents any change in a database). It either happens fully or not happens at all.
2) Connection - typeORM's Connection sets up a connection pool.
3) Entity - it is a class mapped to a database table. 
4) EntityManager - using EntityManager you can manage (insert, update, delete, load, etc.) any entity. It is just like a collection of all entity repositories in a single place.
5) Repository - is just like EntityManager but its operations are limited to a specific entity.

## Creating and Using transactions within TypeORM and NestJS

TypeORM provides a few options for defining transactions:

### 1) Using _transaction_ method of [Connection](https://github.com/typeorm/typeorm/blob/master/docs/connection-api.md#connection-api) class

You can use _getConnection_ method imported from "typeorm" or inject _Connection_ object (no need to import any modules).
Everything you want to run in a transaction must be executed in a callback.

```bash
import { getConnection } from "typeorm";

class ObjectService {
    constructor(private connection: Connection) {}
    
    async createObject(dto: ObjectPostDto) {

        /**
         * Use getConnection() method from "typeorm" OR injected Connection
         */
        (await getConnection() || this.connection)
            .transaction(async (transactionalEntityManager) => {
              
                /**
                 * For ALL the operations you must use provided transactionalEntityManager instance.
                 * Due to fact that EntityManager is like a collection of all entity repositories you must provide the Entity to the operation that will be perfomed.
                 */
                
                const newObject = transactionalEntityManager.create(ObjectEntity, dto);
                awat transactionalEntityManager.save(newObject);
            });
    }
}
```

### 2) Using _transaction_ method of [EntityManager](https://github.com/typeorm/typeorm/blob/master/docs/entity-manager-api.md) class

You can use _getManager_ method imported from "typeorm" or inject _EntityManager_ object (no need to import any modules).
Everything you want to run in a transaction must be executed in a callback.

```bash
import { getManager } from "typeorm";

class ObjectService {
    constructor(private entityManager: EntityManager) {}
    
    async createObject(dto: ObjectPostDto) {
    
        /**
         * Use getManager() method from "typeorm" OR injected EntityManager
         */
        (await getManager() || this.entityManager)
            .transaction(async (transactionalEntityManager) => {
          
                /**
                 * For ALL the operations you must use provided transactionalEntityManager instance.
                 */
                 
                const newObject = transactionalEntityManager.create(ObjectEntity, dto);
                const savedObject = await transactionalEntityManager.save(newObject);
            });
    }
}
```

### 3) Using Transaction decorators

@Transaction - wraps all its execution into a single database transaction. 
_**_IMPORTANT!_**_ **If you don't use @TransactionManager as a function parameter then EntityManager will be implicitly injected as the first parameter.**

@TransactionManager - provides a transaction entity manager that must be used to execute queries inside this specific transaction.

@TransactionRepository - uses transaction entity manager under the hood.

```bash
import { Transaction, TransactionManager, TransactionRepository, EntityManager } from 'typeorm';

class ObjectService {
    /** 
     * Using @TransactionManager
     */
    @Transaction()
    async createObject(dto: ObjectPostDto, @TransactionManager() transactionalEntityManager: EntityManager = null) {
        
        /**
         * For all the operations you must use provided transactionalEntityManager instance.
         */
         
        const newObject = transactionalEntityManager.create(ObjectEntity, dto);
        const savedObject = await transactionalEntityManager.save(newObject);
    }
    
    /** 
     * Using @TransactionRepository. 
     * You can inject repositories like Repository, TreeRepository and MongoRepository (using @TransactionRepository(Entity) entityRepository: Repository<Entity>) 
     * or custom repositories using the @TransactionRepository() customRepository: CustomRepository.
     */
    @Transaction()
    async createObject(dto: ObjectPostDto, @TransactionRepository(ObjectEntity) objectRepository: Repository<ObjectEntity> = null) {
                    
        const newObject = objectRepository.create(dto);
        const savedObject = await objectRepository.save(newObject);
    }
    
    @Transaction()
    async createObject(dto: ObjectPostDto, @TransactionRepository() customObjectRepository: CustomObjectRepository = null) {
              
        await customObjectRepository.customCreateAndSaveMethod(dto);
    }
}
```


### 4) Using QueryRunner to create and control state of a single database connection

QueryRunner provides a single database connection. **All above-mentioned methods that work with Transactions are organized using query runners.** 
Single transactions can only be established on a single query runner. You can manually create a query runner instance and use it to manually control transaction state.

```bash
import { EntityManager, Connection } from 'typeorm';
import { getConnection } from "typeorm";

class ObjectService {
    constructor(private connection: Connection) {}
    
    async createObject(dto: ObjectPostDto) {
        
        /**
         * Get connection and create queryRunner instance.
         */
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner(); // Or use this.connection.createQueryRunner()
        
        await queryRunner.connect()
        
        /**
         * Any queries can be executed on a queryRunner (including queries with configuration run-time parameters)
         */
        await queryRunner.query("SET...");
        
        /**
         * Open a new transaction
         */
        await queryRunner.startTransaction();
        
        try {
          
          /**
           * It is possible to access entity manager that works with connection created by a queryRunner
           */
          const newObject = queryRunner.manager.create(ObjectEntity, dto);
          const savedObject = await queryRunner.manager.save(newObject);
          
          /**
           * Commit transaction:
           */
          await queryRunner.commitTransaction();
          
        } catch(error) {
           /**
            * In case of any error rollback all the changes
            */
           await queryRunner.rollbackTransaction()
          
        } finally {
           /**
            * Release queryRunner which is manually created
            */
           await queryRunner.release();
        }
    }
    
}
```

_**_IMPORTANT NOTES!_**_

* **All these ways of using transactions have one common requirement. ALWAYS use the provided instance of entity manager (transactionalEntityManager or queryRunner.manager from the examples).**
* **If you use global manager (from getManager or manager from connection or call operation from injected Repository) you'll have inconsistency problems.**

For example, imagine that ObjectService class has to work with two different entities (like ObjectEntity and FiletEntity).

```bash
import { Transaction, TransactionManager, TransactionRepository, EntityManager } from 'typeorm';

class ObjectService {
    constructor(
        @InjectRepository(ObjectEntity) private objectRepository: Repository<ObjectEntity>,
        @InjectRepository(FileEntity) private fileRepository: Repository<FileEntity>
    ) {}
    
    /**
     * If you want to save ObjectEntity and FileEntity inside a SINGLE database transaction you CAN NOT use .save() method of injected Repositories
     * because SAVE method saves given entity already in a single independent transaction by default.
     * If any error occurs during Object saving operation then it WILL NOT be saved while a File WILL be saved.
     */
            
    async createObjectAndFile(objectDto: ObjectPostDto, fileDto: FilePostDto) {
                    
        const newObject = this.objectRepository.create(objectDto);
        const newFile = this.fileRepository.create(fileDto);
        
        const savedObject = await this.objectRepository.save(newObject); // First independent transaction
        const savedFile = await this.fileRepository.save(newFile); // Second independent transaction
    }
    
    
    @Transaction()
    async createObjectAndFile(objectDto: ObjectPostDto, fileDto: FilePostDto, @TransactionManager() transactionalEntityManager: EntityManager = null) {
        
        /**
         * For all operations you must use provided transactionalEntityManager instance
         */
        
        const newObject = transactionalEntityManager.create(ObjectEntity, objectDto);
        const newFile = transactionalEntityManager.create(FileEntity, fileDto);
        
        /**
         * Now the operations are performed in a SINGLE database transaction and in case of any error
         * changes will be rollbacked.
         */
         
        const savedObject = await transactionalEntityManager.save(newObject); 
        const savedFile = await transactionalEntityManager.save(newFile); 
        
    }
    
    someMethod() {
      ...some work with objectRepository and fileRepository not within transactions
    }
}
```