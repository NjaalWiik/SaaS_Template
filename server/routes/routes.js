const { register, login } = require('../middleware/authController');

const addRoutes = app => {
  app.all('*', (req, res, next) => {
    console.log(req.method + ' ' + req.url);
    next();
  });
  //app.get
  app.get('/test-url', (req, res, next) => {
    res.send('Success');
  });

  //app.post
  app.post('/api/register', register);
  app.post('/api/login', login);
};

const routes = {
  addRoutes
};

module.exports = routes;
