// app.js

const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

//MOCK
let toDoList = [
  { Task: "Buy Eggs", Details: "Get brown" },
  { Task: "Finish BEW Contractor project", Details: "Due Tomorrow" }
]

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// INDEX
app.get('/',(req, res) => {
  res.render('todo-index', { toDoList: toDoList });
})


app.listen(4000, () => {
  console.log('App listening on port 4000!')
})
