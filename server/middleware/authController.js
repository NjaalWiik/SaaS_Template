const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate the input fields
  const validationErrors = [];

  if (!email) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'email',
      message: ' You must provide an email address'
    });
  }

  const isEmailValid = email && validateEmail(email);
  if (email && !isEmailValid) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'email',
      message: 'Email is not valid'
    });
  }

  if (!password) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'password',
      message: ' You must provide a password'
    });
  }

  if (validationErrors.length) {
    const errorObject = {
      error: true,
      errors: validationErrors
    };

    res.status(422).send(errorObject);

    return;
  }

  // Save this info to DB

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(200).send({
      user
    });
  } catch (e) {
    console.log('e ', e);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate the input fields
  const validationErrors = [];

  if (!email) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'email',
      message: ' You must provide an email address'
    });
  }

  const isEmailValid = email && validateEmail(email);
  if (email && !isEmailValid) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'email',
      message: 'Email is not valid'
    });
  }

  if (!password) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'password',
      message: ' You must provide a password'
    });
  }

  if (validationErrors.length) {
    const errorObject = {
      error: true,
      errors: validationErrors
    };

    res.status(422).send(errorObject);

    return;
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
