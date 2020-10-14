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

### Examples

#### authors
POST "/graphql"
```json
{
    "query": "{authors{id,name,age}}",
}
```
Response: 
Status : 200
```json
{
  "data": {
    "authors": [
      {
        "id": "5f86e6c0b8feb6001245ecbd",
        "name": "Nicolas",
        "age": 35
      },
      {
        "id": "5f86e75bb8feb6001245ecbe",
        "name": "Vincent",
        "age": 32
      }
    ]
  }
}
```
#### author
POST "/graphql"
```json
{
    "query": "{author{id:"5f86e6c0b8feb6001245ecbd"}}",
}
```
Response: 
Status : 200
```json
{
  "data": {
    "author": {
      "id": "5f86e6c0b8feb6001245ecbd",
      "name": "Nicolas",
      "age": 35,
      "books": [
        {
          "id": "5f870c5b2775130267a7c603",
          "name": "nice book",
          "genre": "book"
        },
        {
          "id": "5f870c88cd3fc40292e6ae21",
          "name": "a other nice book",
          "genre": "book"
        }
      ]
    }
  }
}
```
#### add author
POST "/graphql"
```json
{
    "query": "mutation {addAuthor(name: "Yannick", age: 28){id,name}}",
}
```
Response: 
Status : 200
```json
{
  "data": {
    "addAuthor": {
      "id": "5f870e61d183a702bbe1063f",
      "name": "Yannick"
    }
  }
}
```
#### update author
POST "/graphql"
```json
{
     "query": "mutation {updateAuthor(_id: "5f870e61d183a702bbe1063f", name: "Steven", age: 24){id,name}}"
}
```
Response: 
Status : 200
```json
{
  "data": {
    "updateAuthor": {
      "id": "5f870e61d183a702bbe1063f",
      "name": "Steven"
    }
  }
}
```
#### delete author
POST "/graphql"
```json
{
     "query": "mutation {deleteAuthor(_id: "5f870e61d183a702bbe1063f"){id,name}}"
}
```
Response: 
Status : 200
```json
{
  "data": {
    "deleteAuthor": {
      "id": "5f870e61d183a702bbe1063f",
      "name": "Steven"
    }
  }
}
```