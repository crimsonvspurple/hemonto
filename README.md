<p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## Description
A rapid prototype of a REST API system for some slicing and dicing!

## Goals
- [x] Get hands wet with NestJS. Great framework for building scalable Node.js applications. Documentation is very good.
- [x] Use TypeORM, Class-Validator, Class-Transformer, and other libraries already familiar with.
- [x] Error handling and proper response codes. Would implement global exception filter later.
- [x] SQLite integration for development and testing.
- [x] Employee CRUD, partial User CRUD
- [x] DB Seeder endpoints
- [x] Use of NestJS CLI for best practices.
- [x] Proper DTO and Entity separation with validation.
- [x] Some usage of global pipes and interceptors. Need to use more for better code structure.
- [x] JWT Authentication (TBD: Refresh Token)
- [ ] Role-based Authorization
- [x] Unit Tests
- [x] E2E Tests
- [x] Dockerize
- [ ] CI/CD (Soon)
- [ ] Serverless microservices with AWS Lambda (Near future)
- [ ] Secrets management with AWS Secrets Manager
- [ ] Add caching with Redis and search with ElasticSearch
- [ ] Add scheduler and MQ processing
- [ ] Base Models, Repositories, Services, and Controllers to reduce boilerplate code
- [x] Swagger API Documentation

### Some Observations
- Important things to follow: DRY, Separation of Concern and Clean Code.
- Use of DTOs and Entities are very important. DTOs are used for validation and Entities are used for database operations.
- Global pipes and interceptors can be used for logging, validation, and other purposes. Really important for better code structure.
- Have to always be careful about DB query. Instead of querying the employees and calculating mean/min/max (SS), doing it over the DB is much faster/effective.
- 

## Quick Start
```bash
$ docker-compose up # start the nodejs server at localhost:3000
$ yarn install  # install dependencies for dev
$ yarn run start:dev  # watch mode dev
$ yarn run test # unit tests
$ yarn run test:e2e # e2e tests
$ yarn run test:cov # test coverage
```
## License

[MIT licensed](LICENSE).
