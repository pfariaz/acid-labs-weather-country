const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const init = () => {
  const app = express();
  var port = normalizePort(process.env.PORT || '8000');
  module.exports = app;

  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  Promise.resolve()
    .then(() => {
      routes.init(app);

      // catch 404 and forward to error handler
      app.use(function(req, res, next) {
        next(createError(404));
      });

      // error handler
      app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
      });

      app.listen(port);

      console.log(`Listening on port: ${port}`);
    })
    .catch(console.error);
};
init();
