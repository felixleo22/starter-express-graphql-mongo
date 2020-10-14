# starter-express-graphql-mongo

project that allows you to understand the basics of graphql

## Prerequisites

The tools you need to let this project run are :
* docker
* docker-compose
* npm

## Installation

``` git clone https://github.com/felixleo22/starter-express-graphql-mongo ```

### Start


Before you start the starter, make sure have download all dependencies with npm.

```bash
# Start ez-unpaywall as daemon
docker-compose up -d

# Stop ez-unpaywall
docker-compose stop

# Get the status of ez-unpaywall services
docker-compose ps
```

### défault ports

- 8080 : graphql 
- 8081 : mongo-express
- 27017 : mongoDB

## API

### Object structure

<p align="center">
  <img src="https://github.com/felixleo22/starter-express-graphql-mongo/blob/master/img/modele.png" />
</p>