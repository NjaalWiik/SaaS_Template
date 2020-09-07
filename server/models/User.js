const mongoose = require('mongoose');

let User;

if (!User) {
  const UserSchema = new mongoose.Schema(
    {
      user: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
  );
}

module.exports = User = mongoose.model('user', UserSchema);
