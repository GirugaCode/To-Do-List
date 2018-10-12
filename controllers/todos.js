//todos.js
module.exports = function (app, Todo) {

  app.get('/', (req, res) => {
    Todo.find()
      .then(todos => {
        res.render('todos-index', {todos: todos});
      })
      .catch(err => {
        console.log(err);
      });
  });

  // SHOW
  app.get('/todos/:id', (req, res) => {
    // find todo
    Todo.findById(req.params.id).then(todo => {
        res.render('todos-show', { todo: todo})
      }).catch((err) => {
      // catch errors
    });
});

}
