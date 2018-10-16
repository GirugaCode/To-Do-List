const exphbs = require('express-handlebars');
const todoController = require('./controllers/todos');
const mongoose = require('mongoose');
const Todo = require('./models/todo')
const Activity = require('./models/activity')
const express = require('express')
const methodOverride = require('method-override')
const app = express()



// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');


// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// NEW
app.get('/todos/new', (req, res) => {
  res.render('todos-new', {});
})

//CREATE
app.post('/todos', (req, res) => {
  Todo.create(req.body).then((todo) => {
    console.log(todo);
    res.redirect(`/todos/${todo._id}`) // Redirect to todos/:id
  }).catch((err) => {
    console.log(err.message);
  })
})


// EDIT
app.get('/todos/:id/edit', function (req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    res.render('todos-edit', {todo: todo});
  })
})

// UPDATE
app.put('/todos/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body)
    .then(todo => {
      res.redirect(`/todos/${todo._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/todos/:id', function (req, res) {
  console.log("DELETE todo")
  Todo.findByIdAndRemove(req.params.id).then((todo) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// INDEX
app.get('/', (req, res) => {
  Todo.find()
    .then(todos => {
      res.render('todos-index', { todos: todos });
    })
    .catch(err => {
      console.log(err);
    })
})

// const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/todos';
mongoose.connect(mongoUrl, {useNewUrlParser: true});

app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!')
})

var todoRoutes = require('./controllers/todos')
var activityRoutes = require('./controllers/activities')

todoRoutes(app, Todo, Activity);
activityRoutes(app, Activity);


module.exports = app;
