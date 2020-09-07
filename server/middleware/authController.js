const { restart } = require('nodemon');

exports.register = (req, res, next) => {
  const { email, password } = req.body;

  // Validate the input fields
  const validationErrors = [];

  if (!email) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'email',
      message: 'You must provide an email address.'
    });
  }

  if (email && !validateEmail(email)) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'email',
      message: 'Email is not valid.'
    });
  }

  if (!password) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'password',
      message: 'You must provide a password.'
    });
  }

  if (validationErrors.length) {
    const errorObject = {
      error: true,
      errors: validationErrors
    };

    res.send(errorObject);
  }

  res.send('success');
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
