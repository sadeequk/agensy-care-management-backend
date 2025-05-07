const User = require('../models/user');

module.exports.addUserBasic = ({ firstName, lastName, email, phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const newUser = new User({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone,
        password: password.trim(),
        isPhoneVerified: false,
        isEmailVerified: false,
      });
      await newUser.save();
      // resolve(newUser);
      const userResponse = {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        isPhoneVerified: newUser.isPhoneVerified,
        isEmailVerified: newUser.isEmailVerified,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        __v: newUser.__v,
      };
      resolve(userResponse);
    } catch (error) {
      console.log('UserService [addUserBasic] Error:', error);
      reject(error);
    }
  });

module.exports.readByEmail = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      return resolve(user);
    } catch (error) {
      console.error('UserService [readByEmail] Error:', error);
      return reject(error);
    }
  });

module.exports.readByPhone = async (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ phone });
      resolve(user);
    } catch (error) {
      console.error('UserService [readByPhone] Error:', error);
      reject(error);
    }
  });
};
module.exports.updateEmailVerificationCode = async (userId, code, expiry) => {
  await User.findByIdAndUpdate(userId, {
    emailVerificationCode: code,
    emailVerificationCodeExpiry: expiry,
  });
};

//
module.exports.updateEmailVerificationStatus = async (userId, status) => {
  await User.findByIdAndUpdate(userId, {
    isEmailVerified: status,
    emailVerificationCode: null,
    emailVerificationCodeExpiry: null,
  });
};
//
module.exports.updatePhoneVerificationCode = async (userId, code, expiry) => {
  await User.findByIdAndUpdate(userId, {
    phoneVerificationCode: code,
    phoneVerificationCodeExpiry: expiry,
  });
};

module.exports.updatePhoneVerificationStatus = async (userId, status) => {
  await User.findByIdAndUpdate(userId, {
    isPhoneVerified: status,
    phoneVerificationCode: null,
    phoneVerificationCodeExpiry: null,
  });
};

module.exports.readById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id).select('-password');

      return resolve(user);
    } catch (error) {
      console.log('UserService [readById] Error: ', error);
      return reject(error);
    }
  });

module.exports.loginUser = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Find user by email
      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) return reject(new Error('Invalid Email or Password'));

      // Check if the password matches
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) return reject(new Error('Invalid Email or Password'));

      // Check verification status
      if (!user.isEmailVerified && !user.isPhoneVerified) {
        return reject(new Error('Please verify your Email and Phone to log in.'));
      } else if (!user.isEmailVerified) {
        return reject(new Error('Please verify your Email to log in.'));
      } else if (!user.isPhoneVerified) {
        return reject(new Error('Please verify your Phone to log in.'));
      }

      // User is fully verified, prepare the response
      const userResponse = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        isPhoneVerified: user.isPhoneVerified,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      resolve(userResponse);
    } catch (error) {
      console.error('UserService [loginUser] Error:', error);
      reject(error);
    }
  });

module.exports.updateForgotPasswordCode = (userId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordCode: data.forgotPasswordCode,
          passwordResetCodeExpiry: data.passwordResetCodeExpiry,
        },
        { new: true }
      );
      return resolve(user);
    } catch (error) {
      console.log('UserService [updateForgotPasswordCode] error: ', error);
      return reject(error);
    }
  });
module.exports.updatePassword = (userId, newPassword) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          password: newPassword,
        },
        { new: true }
      );
      return resolve(user);
    } catch (error) {
      console.log('Userservice [updatePassword] error :', error);
      return reject(error);
    }
  });

module.exports.validatePassword = (userId, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const foundUser = await User.findById(userId);
      const validation = await foundUser.isValidPassword(password);
      return resolve(validation);
    } catch (error) {
      console.log('UserService [validatePassword] error: ', error);
      return reject(error);
    }
  });
