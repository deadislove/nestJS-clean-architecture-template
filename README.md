<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">
  A scalable and maintainable backend project template built with <a href="https://github.com/nestjs/nest" target="_blank">NestJS</a> and Clean Architecture principles.
  </p>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<!--![Visitors](https://visitor-badge.laobi.icu/badge?page_id=deadislove.nestJS-clean-architecture-template) -->
<!--![Visitors](https://img.shields.io/badge/visitors-99_total-brightgreen) -->
![Visitors](https://img.shields.io/badge/visitors-99_total-brightgreen)
![Clones](https://img.shields.io/badge/clones-25_total_18_unique-blue) <!--CLONE-BADGE-->

## Description

This project is a TypeScript-based server-side application template built with the [Nest](https://github.com/nestjs/nest) framework, following the principles of Clean Architecture. It emphasizes maintainability, testability, and clear separation of concerns across multiple layers, including Domain, Application, Infrastructure, and Interfaces. The architecture ensures that core business logic remains decoupled from external frameworks and database implementations. It supports multiple databases (SQLite, PostgreSQL, MySQL) and uses the Factory Pattern to switch between them seamlessly. The project also includes Docker integration, environment variable configuration, and strategies for automated testing and deployment. This template is well-suited for building scalable backend services in both practice and production environments.

<a href='https://ko-fi.com/F1F82YR41' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## 🧱 Project Architecture

This project follows the principles of Clean Architecture, implemented using NestJS, to promote maintainability, testability, and clear separation of concerns.

```
clean-architecture/
├── src/
│   ├── domain/                 # Domain Layer: core business logic & contracts
│   │   ├── entities/           # Pure business models (no tech dependencies)
│   │   └── repositories/       # Abstract interfaces for persistence
│   ├── application/            # Application Layer: orchestrates use cases
│   │   ├── use-cases/          # Business use cases (application services)
│   │   └── interfaces/         # DTOs shared across use cases
│   ├── infra/                  # Infrastructure Layer: tech implementations
│   │   ├── persistence/        # TypeORM-based repository implementations
│   │   ├── database/           # Multi-DB config support (SQLite, PostgreSQL, MySQL)
│   │   └── services/           # 3rd-party or system services (e.g. Mailer)
│   ├── interfaces/             # Interface Layer: controllers and HTTP interfaces
│   │   ├── http/               # NestJS HTTP controllers and route DTOs
│   │   └── modules/            # Modular grouping of controllers + use-cases
│   ├── shared/                 # Cross-cutting concerns (response wrapper, etc.)
│   └── main.ts                 # NestJS app entry point
├── test/                       # E2E and integration tests
├── config/                     # App-level configuration (via `.env`, etc.)
├── Dockerfile / docker-compose.yml  # Container support
├── sample.env                  # Environment variable template
└── structure.txt               # Text-based folder structure summary
```

## 📦 Explanation of Layers

1. domain/ — 💡 Core Business Logic

    - Contains your domain Entities, Value Objects, and Repository Interfaces
    - No dependency on any other layer
    - Pure logic, fully testable

2. application/ — 🧠 Use Cases (Application Logic)

    - Contains all business use cases
    - Orchestrates domain entities, calls repositories
    - Defines DTOs used by the use cases (input/output)

3. infrastructure/ — 🧱 Framework/Tech-Specific Implementations

    - Contains database, third-party services, adapters
    - Implements UserRepository with TypeORM, etc.

4. interfaces/http/ — 🌐 NestJS Controllers and Request Mapping

    - Controllers act as delivery mechanisms
    - Maps HTTP requests → use case input, and use case output → response
    - Validation & decorators handled here (e.g., @Body, @IsEmail)

5. config/ — ⚙️ Centralized Configurations

    - Environment, DB, and app-wide config files

6. shared/ — 🧩 Cross-Cutting Stuff

    - Utilities, logging, exceptions, etc. that can be reused across layers

## 🧪 Testing Strategy

- test/ contains E2E tests using NestJS utilities.
- Unit tests can be colocated in each layer using __tests__ directories.

## 🛠 Tech Stack

- NestJS — Scalable backend framework.
- TypeORM — ORM abstraction layer.
- SQLite / PostgreSQL / MySQL — Multi-database support.
- Docker — Containerized development & deployment.
- DotEnv — Environment-based configuration.
- ESLint + Prettier — Code formatting and linting standards.

## 📦 Environment Configuration

This project uses .env variables for runtime flexibility.

```
PORT=3000
DB_TYPE='sqlite'

DB_HOST='localhost'
DB_PORT='5432'
DB_USERNAME=''
DB_PASSWORD=''
DB_NAME=''
```

- DB_TYPE supports: 'sqlite', 'postgres', 'mysql'
- Other DB credentials are required only for PostgreSQL or MySQL

## 🧱 Database Strategy (Factory Pattern)

This project supports pluggable database backends using a factory pattern, allowing you to switch between SQLite, PostgreSQL, and MySQL with minimal configuration change.

### 🔧 database.config.factory.ts

```
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MySQLDatabase, PostgresDatabase, SQLiteDatabase } from './factory';

export class DatabaseFactory {
  static createDatabaseConnection(dbType: string, configService: ConfigService): TypeOrmModuleOptions {
    switch (dbType) {
      case 'sqlite':
        return new SQLiteDatabase(configService).getConnection();
      case 'postgres':
        return new PostgresDatabase(configService).getConnection();
      case 'mysql':
        return new MySQLDatabase(configService).getConnection();
      default:
        throw new Error('Unsupported database type');
    }
  }
}
```

- ConfigService reads from .env
- Each class under factory/ implements .getConnection() to return a TypeOrmModuleOptions config

### 📁 Folder Structure

```
src/
└── infra/
    └── database/
        ├── database.config.factory.ts       # DB factory entry point
        └── factory/
            ├── database.mysql.ts            # MySQL config
            ├── database.postgresql.ts       # PostgreSQL config
            └── database.sqllite.ts          # SQLite config
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Da-Wei Lin](https://www.linkedin.com/in/da-wei-lin-689a35107/)
- Website - [David Weblog](https://davidskyspace.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
