const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPhoneVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },

    emailVerificationCode: { type: Number, default: null },
    emailVerificationCodeExpiry: { type: Date, default: null },

    phoneVerificationCode: { type: Number, default: null },
    phoneVerificationCodeExpiry: { type: Date, default: null },

    forgotPasswordCode: { type: Number, default: null },
    passwordResetCodeExpiry: { type: Date, default: null },
  },

  { timestamps: true }
);

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Encrypt the Password before Updating
userSchema.pre('findOneAndUpdate', async function (next) {
  const updatedInfo = this.getUpdate();
  if (updatedInfo.password) {
    updatedInfo.password = await bcrypt.hash(updatedInfo.password, 10);
  }
  next();
});

// Check if the password is correct
userSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

module.exports = mongoose.model('User', userSchema);
