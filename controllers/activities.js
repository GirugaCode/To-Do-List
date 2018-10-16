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

}
