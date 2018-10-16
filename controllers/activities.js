// activities.js

module.exports = (app, Activity) => {


  // CREATE Activity
  app.post('/todos/activities', (req, res) => {
    console.log(req.body)
    Activity.create(req.body).then(activity => {
      res.redirect(`/todos/${activity.todoId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  // DELETE
  app.delete('/todos/activities/:id', function (req, res) {
    console.log("DELETE activity")
    Activity.findByIdAndRemove(req.params.id).then((activity) => {
      res.redirect(`/todos/${activity.todoId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

}
