|                                | **Prisma**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **TypeORM**                                                                                                                                                                                                                                                                                                                                     | **Pure SQL**                                                                                                                                                                                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Release date**                   | Launch: April 2019                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Release 06.12.2016                                                                                                                                                                                                                                                                                                                          | Release Date: 2010                                                                                                                                                                                                                                                     |
| **Community**                      | Prisma team are mentoring GitHub issues and typically respond within 24 hours after an issue is opened. New releases happen every two weeks.There is a dedicated Community Support team that tries to help developers whenever they raise questions about Prisma.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | The npm package TypeORM receives a total of 772,837 weekly downloads. The most mature community.                                                                                                                                                                                                                                           | 9.8k Stars on Github Page;<br>About 2 000 000 downloads per week;<br>Has financial support and major sponsors:<br>\- Crate.io;<br>\- Eaze;                                                                                                                             |
| **Purpose/what problems solve**   | Prisma's main goal is to make application developers more productive when working with databases.<br> Here are a few examples of how Prisma achieves this:<br>\- Single source of truth for database and application models.<br>\- Type-safe database queries that can be validated at compile time<br>\- Less boilerplate so developers can focus on the important parts of their app.<br>\- Auto-completion in code editors instead of needing to look up documentation<br>\- One of the main differences between Prisma and TypeORM is that Prisma uses Prisma scheme instead of decorators and classes for defining data models                                                                                                                                                                                | \- TypeORM is open source project<br>\- Perfect for using with TypeScript<br>\- Support the latest features of JS<br>\- Supports few design patterns(repository pattern, active record pattern, Data Mapper Design)<br><br>Solved problem : TypeOrm lets you query and manipulate data from database in more convenient way.                | Direct connection to DB using raw SQL query without proxies(ORMs);<br>Provides Client and Pool interfaces for Postgres DB connection;<br>With this approach we get low-level control of communication between DB and server;<br>Doesn't depend on third-library tools; |
| **TypeScript Support**             | Relationships in Prisma are strongly typed as opposed to TypeORM. There are numerous situations where the type safety guarantees of TypeORM fall short(find with relations, using a FindOperator like ILike or MoreThan, specifying non-existing properties, create with \`save\`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ORM for TypeScript and JavaScript (ES7, ES6, ES5).                                                                                                                                                                                                                                                                                          | Supports Typescript via @types/pg package                                                                                                                                                                                                                              |
| **Officially Supported Databases** | PostgreSQL, MySQL, SQLite<br>In preview: SQL Server, MongoDB<br>SQL Server and MongoDB currently available only as Preview feature. Adopting Prisma into MongoDB or SQL Server projects currently has some limitations. For example, if Prisma is used with MongoDB, there will be a few limitations: the Migrate and Introspection workflows are not supported; @@id and auto-increment are not currently supported; and couple of other limitations                                                                                                                                                                                                                                                                                                                                                          | Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana, WebSQL databases.                                                                                                                                                                                                                                            | Postgres                                                                                                                                                                                                                                                               |
| **Connections pool**               | PrismaClient automatically connects when you run your first query, creates a connection pool, and disconnects when the Node.js process ends. PrismaClient allows you to set the connection\_limit and pool\_timeout parameters.<br> PrismaClient can work with PgBouncer to hold a connection pool to the database and proxies incoming client connections.<br>Serverless-mysql implements cannot be used with Prisma.<br>Prisma is compatible with AWS RDS Proxy. However, there is no benefit in using it for connection pooling with Prisma due to the way RDS Proxy pins connections.                                                                                                                                                                                                                      | TypeORM by default uses a connection pool which defaults to 10 connections. If you want to have custom pooling limit (advisable), the same can be mentioned for connectionLimit under extra options in config file.                                                                                                                         | Pg ships with built-in connection pooling. The client pool allows you to have a reusable pool of clients you can check out, use, and return.                                                                                                                           |
| **Transaction Support**            | Prisma supports two ways to work with transactions both through transaction API: 1. we can pass an array of queries to $transaction method; 2. interactive transactions (in Preview), when we pass callback function in $transaction method. Unfortunately, transaction support in Prisma currently has some limitations:<br> 1. transaction isolation level is not currently configurable at a Prisma level and is not explicitly set by Prisma;<br> 2. concurrent interactive transactions may timeout. Also, it should be mentioned that Prisma doesn't support long-running transactions. Moreover, Prisma teams consider that long-running transaction isn’t a good practice so they don’t plan to add support for them. Instead, they offer a couple of alternatives such as nested writes and atomic operators. | The official TypeORM documentation mentions a few options for defining transactions: via Connection,  EntityManager, QueryRunner (gives full control over the transaction. Each instance of it is a separate isolated database connection.)<br>                                                                                             | Pg doesn't provide any higher level abstractions specifically around transactions. To execute a transaction with node-postgres we can simply execute begin/commit/rollback queries ourself through a client.                                                          |
| **Caching**                        | Prisma does not support query caching out of the box, but there is a request to add this feature                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | TypeOrm supports data caching. To do this, you can use the following methods:<br>\- You can cache results selected by these QueryBuilder methods: getMany, getOne, getRawMany, getRawOne and getCount.<br>To enable caching you only need to explicitly enable it in your connection options.<br>Default cache lifetime is equal for 1 sec. | query plan caching using named statements                                                                                                                                                                                                                              |
| **Stream**                         | Currently, streams don’t have direct support in Prisma. But there are a few means that can help in situations when you need streams. For example, when you need to sequentially retrieve data from the table you can use offset or cursor pagination; when you need to add a large amount of data at once you can use batch/bulk operations (createMany, updateMany, deleteMany).                                                                                                                                                                                                                                                                                                                                                                                                                              | Support streaming raw results. We need to use QueryBuilder to configure this system behavior.                                                                                                                                                                                                                                               | We can use pg.Cursor API to simulate a 'streaming' style read of data, or exit early from a large result set. It is used to efficiently read through large result sets without loading the entire result-set into memory ahead of time.                                |
| **Migration**                      | Prisma Migrate generates a history of .sql migration files.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | TypeOrm supports migrations. We can run it using typeORM CLI, for example: _typeorm migration:generate -n UserMigration_.<br>A migration is just a single file with sql queries to update a database schema and apply new changes to an existing database.                                                                                   | node-pg-migrate package for migration: has CLI and Programmatic API for migration management;                                                                                                                                                                          |
| **Other**                          | Prisma Studio is a visual editor for the data in your database. You can run it with two ways:<br>1\. Run $npx prisma studio in your terminal.<br>2\. Install the desktop app from the installers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | One of the most powerful features of TypeORM is QueryBuilder.<br>It’s allows you to build SQL queries using elegant and convenient syntax, execute them and get automatically transformed entities.                                                                                                                                         | Pg has rich support from relating npm modules that extend its functionality and complete the picture;<br>List of packages link: https://github.com/brianc/node-postgres/wiki/Extras                                                                                   |