const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

let id = '';
const falseid = 'falseID';

describe('Tasks API', () => {
  /**
     * Get all
     */
  describe('Get /graphql?query={authors{name,age}}', () => {
    it('It should GET all the authors', (done) => {
      chai.request(server)
        .get('/graphql?query={authors{name,age}}')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.data.should.have.property('authors');
          response.body.data.authors.should.be.a('array');
          done();
        });
    });
  });

  /**
     * Add a new author
     */
  describe('Post /graphql?query=mutation{addAuthor(name:"addAuthor", age:23){name,age,id}}', () => {
    it('It should Post a new Author', (done) => {
      chai.request(server)
        .post('/graphql?=', { json: true })
        .set('content-type', 'application/json')
        .send({ query: 'mutation author{author: addAuthor(name: "addAuthor", age:23){name,age,id}}' })
        .end((err, response) => {
          id = response.body.data.author.id;
          response.should.have.status(200);
          response.body.data.should.have.property('author');
          response.body.data.author.should.have.property('name').eq('addAuthor');
          response.body.data.author.should.have.property('age').eq(23);
          response.body.data.author.should.have.property('id');
          done();
        });
    });
  });

  /**
     * Get by id
     */
  describe('/graphql?query={author(id:"id"){id,name,age}}', () => {
    it('It should GET the Author by his id', (done) => {
      chai.request(server)
        .get(`/graphql?query={author(id:"${id}"){id,name,age}}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.data.should.have.property('author');
          response.body.data.author.should.have.property('name').eq('addAuthor');
          response.body.data.author.should.have.property('id').eq(id);
          done();
        });
    });

    it('It should NOT GET the Author by his false id', (done) => {
      chai.request(server)
        .get(`/graphql?query={author(id:"${falseid}"){id,name}}`)
        .end((err, response) => {
          // TODO fix code status
          // response.should.have.status(404);
          response.body.should.be.a('object');
          response.body.should.have.property('errors');
          done();
        });
    });
  });
  /**
     * Update
     */
  describe('Update /graphql?query=mutation{updateAuthor(_id:"id",name: "updateAuthor"){name,id,age}}', () => {
    it('It should update a Author', (done) => {
      chai.request(server)
        .post('/graphql?=', { json: true })
        .set('content-type', 'application/json')
        .send({ query: `mutation author{updateAuthor(_id:"${id}", name: "updateAuthor"){id,name,age}}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.data.updateAuthor.should.have.property('name');
          response.body.data.updateAuthor.should.have.property('name').eq('updateAuthor');
          done();
        });
    });

    it('It should NOT update a Author', (done) => {
      chai.request(server)
        .post('/graphql?=', { json: true })
        .set('content-type', 'application/json')
        .send({ query: `mutation author{updateAuthor(_id:"${falseid}", name: "updateAuthor"){id,name,age}}` })
        .end((err, response) => {
          // TODO fix code status
          // response.should.have.status(404);
          response.should.have.status(200);
          done();
        });
    });
  });

  /**
     * Delete a Author
     */
  describe('Delete /graphql?query=mutation{deleteAuthor(_id:"id"){id,name,age}}', () => {
    it('It should delete a Author', (done) => {
      chai.request(server)
        .post('/graphql?=', { json: true })
        .set('content-type', 'application/json')
        .send({ query: `mutation author{deleteAuthor(_id:"${id}"){id,name,age}}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.data.should.have.property('deleteAuthor');
          response.body.data.deleteAuthor.should.have.property('name');
          response.body.data.deleteAuthor.should.have.property('name').eq('updateAuthor');
          done();
        });
    });

    it('It should NOT delete a Author', (done) => {
      chai.request(server)
        .post('/graphql?=', { json: true })
        .set('content-type', 'application/json')
        .send({ query: `mutation author{deleteAuthor(_id:"${falseid}"){id,name,age}}` })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
});
