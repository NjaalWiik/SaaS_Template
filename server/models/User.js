const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User;

if (!User) {
  let UserSchema = new Schema(
    {
      email: { type: String, required: true, lowercase: true, unique: true },
      password: { type: String, required: true },

      // Fields related to account activation
      activated: { type: Boolean },
      activationToken: { type: String, unique: true, sparse: true },
      activationTokenSentAt: { type: Date },
      activatedAt: { type: Date },

      // Fields related to reset password
      resetPasswordToken: { type: String, unique: true, sparse: true },
      resetPasswordTokenSentAt: { type: Date },

      // Payments related
      stripeDetails: {}
    },
    {
      timestamps: true
    }
  );

  User = mongoose.model('user', UserSchema);
}
module.exports = User;
