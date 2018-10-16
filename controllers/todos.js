//todos.js
module.exports = function (app, Todo, Activity) {

  app.get('/', (req, res) => {
    Todo.find()
      .then(todos => {
        res.render('todos-index', {todos: todos});
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });

  // SHOW
  app.get('/todos/:id', (req, res) => {
    // find todo
    Todo.findById(req.params.id).then(todo => {
      Activity.find({ todoId: req.params.id }).then(activities => {
       // respond with the template with both values
        res.render('todos-show', { todo: todo, activities: activities })
       }) .catch((err) => {
       // catch errors
       console.log(err.message)
     });
      })// fetch its activities

});

}
