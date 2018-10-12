// app.js

const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Todo-lists');

const Lists = mongoose.model('Lists', {
  Task: String,
  Details: String
});

// //MOCK
// let toDoList = [
//   { Task: "Buy Eggs", Details: "Get brown" },
//   { Task: "Finish BEW Contractor project", Details: "Due Tomorrow" },
//   { Task: "Buy clipper cards for guest", Details: "Pick up at walgreens"}
// ]

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



// INDEX
app.get('/', (req, res) => {
  Lists.find()
    .then(toDoList => {
      res.render('todo-index', { toDoList: toDoList });
    })
    .catch(err => {
      console.log(err);
    })
})

// INDEX
app.get('/',(req, res) => {
  res.render('todo-index', { toDoList: toDoList });
})


app.listen(4000, () => {
  console.log('App listening on port 4000!')
})
