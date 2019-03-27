import MonitoryTask from './task/MonitoryTask';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const log4js = require('log4js');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const monitorRouter = require('./routes/monitor');
const passport = require('./utils/passport').default;
const schedule = require('node-schedule');

// const easyMonitor = require('easy-monitor');

// easyMonitor('labserver');
const log = log4js.getLogger('app');
log.level = 'debug';
log.debug('Some debug messages');

const app = express();
// test1
// test2
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: log4js.levels.INFO }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/monitor', monitorRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  // next(createError(404));
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


schedule.scheduleJob('30 0 1 * * *', async () => {
  log.info('MonitoryTask spiderCommunityPrice begin');
  await MonitoryTask.spiderCommunityPrice();
  log.info('MonitoryTask spiderCommunityPrice end');
});

module.exports = app;
