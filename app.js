var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var { User } = require('./models')

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var eventsRouter = require('./routes/events');
var aboutRouter = require('./routes/about');

var app = express();

/* 
*setup database
mongo dbh23.mlab.com:27237/thientin2 -u thientin -p 1999thientin

mongodb://thientin:1999thientin@ds031747.mlab.com:31747/thientin
mongodb://thientin:1999thientin@dbh23.mlab.com:27237/thientin2
*/
mongoose.connect('mongodb://thientin:1999thientin@ds031747.mlab.com:31747/thientin', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("kết nối cơ sở dữ liệu thành công")
});

var newUser = new User({ name: "Thien Tin"  , price: 800})
newUser.save().then((err, res) => {
  // db.close(() => console.log ('connection has closed'))
})

User.find({'price': 500}).then((err,res)=>{
  console.log('Danh sach co gia la 500', err, res)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/events', eventsRouter);
app.use('/about', aboutRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
