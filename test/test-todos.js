// test-todos.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Todo = require('../models/todo');

const sampleTodo =      {
    "title": "Buy Eggs",
    "description": "make sure they are organic"
}

chai.use(chaiHttp);

describe('Todos', ()  => {

  after(() => {
    Todo.deleteMany({title: 'Buy Eggs'}).exec((err, todos) => {
      console.log(todos)
      todos.remove();
    })
  });


  // TEST INDEX
  it('should index ALL todos on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
  // TEST CREATE
  it('should create a SINGLE todo on /todos POST', (done) => {
    chai.request(server)
        .post('/todos')
        .send(sampleTodo)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });
  // TEST SHOW
  it('should show a SINGLE todo on /todos/<id> GET', (done) => {
    var todo = new Todo(sampleTodo);
    todo.save((err, data) => {
      chai.request(server)
        .get(`/todos/${todo._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
  });
  // TEST EDIT
  it('should edit a SINGLE todo on /todos/<id>/edit GET', (done) => {
  var todo = new Todo(sampleTodo);
   todo.save((err, data) => {
     chai.request(server)
       .get(`/todos/${data._id}/edit`)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.html
         done();
       });
   });
  });
  // TEST UPDATE
  it('should update a SINGLE todo on /todos/<id> PUT', (done) => {
    var todo = new Todo(sampleTodo);
    todo.save((err, data)  => {
     chai.request(server)
      .put(`/todos/${data._id}?_method=PUT`)
      .send({'title': 'Updating the title'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });
  // TEST DELETE
  it('should delete a SINGLE todo on /todos/<id> DELETE', (done) => {
    var todo = new Todo(sampleTodo);
    todo.save((err, data)  => {
     chai.request(server)
      .delete(`/todos/${data._id}?_method=DELETE`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });
});
