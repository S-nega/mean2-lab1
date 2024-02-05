// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
// const Task = require('./models/task.js'); // Путь к вашему файлу с моделью задач

var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks.js');

const bodyParser = require('body-parser');
const { from, of } = require('rxjs');
const { map, catchError } = require('rxjs/operators');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'tasks-list-ang/dist/tasks-list-ang')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/api/tasks', tasksRouter);

//чтобы обрабатывать все запросы, кроме тех, которые начинаются с /api
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views'));
// });


//mongoose connecting
mongoose.
connect('mongodb+srv://admin:admin@taskslist.ibmtscx.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
console.log('connected to MongoDB')
  }).catch((error) => {
    console.log(error)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;