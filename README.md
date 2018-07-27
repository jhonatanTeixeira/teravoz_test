# Teravoz Test

## Description

This is a solution to teravoz challenge, it was made with flexibility in mind and using
what i believe to be the best NodeJS technology around.

It uses the following stack:
* NodeJS 8+
* TypeScript 2.9
* NestJS
* TypeORM
* Webpack
* Jest
* Mysql 5.7

## Installation

best to use yarn for installation
```bash
$ npm install -g yarn
$ yarn install
```

## Running the app directly

```bash
# development
$ yarn run start
```

```bash
# watch mode
$ yarn run start:dev
```

```bash
# production mode
yarn run start:prod
```

## Running on docker
Install docker and docker-compose

```bash
# docker-compose up [-d]
```

## Testing

There is only one test style wich is a functional test but mocking database and external apis

```bash
$ yarn run test
```

## Architecture

NestJS makes easy to follow all the solid principles, out of the box the single responsability 
and dependency inversion principles will be simple to follow, it helps to work with substitution
principle, but it falls short since the DIC container doesn't resolve services by its
interfaces, which discourages programmers to code for interfaces and abstractions, 
thats why i didn't created interfaces to all of my services, even though i should anyway.
I have used the DomainModel pattern with a service layer, and i was forced to use the
anemic model because typeorm breaks encapsulation, so as stated by Martin Fawler in his
book, my service layer became transaction scripts. However i rather use rich domain objects
but that wasn't going to work on a ORM solution that forces all object properties to be
public.

## What's missing

I didnt complete the test entirely, it works as expected but complete domain object validation
is missing and a more extensive test suite is also missing, however, i ran out of time.

## Code documentation

I believe on self documented code, i mean that the functions names must reflect exaclty
what it does, and by following the single responsability principle along with DIC and
open closed principle i can assure the code is pretty much understandable, simple and 
easy to follow, also the use of TypeScript helps the programmer to understand all dataflow
easily

## Api documentation

if you run the code and access the /api route, you will find the swagger endpoint and
will find entire api specs and documentation and even test it directly from the swagger
interface.