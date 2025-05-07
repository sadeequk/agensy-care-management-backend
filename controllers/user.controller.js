const joiSchemas = require("../validation/user.schemas");
const UserService = require("../services/user.service");
const crypto = require("crypto");
const mailer = require("../config/mailer");
const emailTemplates = require("../templetes/emailTemplates");
const { generateToken } = require("../helpers/jwt");

module.exports.signup_local_post = async (req, res) => {
  try {
    const results = await joiSchemas.local_signup_post.validateAsync(req.body);

    const foundUserByEmail = await UserService.readByEmail(results.email);
    if (foundUserByEmail) return res.fail("User with this email already exists.");

    const foundUserByPhone = await UserService.readByPhone(results.phone);
    if (foundUserByPhone) return res.fail("User with this phone already exists.");

    const newUser = await UserService.addUserBasic({
      firstName: results.firstName,
      lastName: results.lastName,
      email: results.email,
      phone: results.phone,
      password: results.password,
    });

    const emailVerificationCode = crypto.randomInt(100000, 999999).toString();
    const emailVerificationCodeExpiry = new Date(Date.now() + 30 * 60 * 1000);
    await UserService.updateEmailVerificationCode(newUser._id, emailVerificationCode, emailVerificationCodeExpiry);

    const emailContent = emailTemplates.getEmailVerificationTemplate(newUser.firstName, emailVerificationCode);

    await mailer.sendMail({
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Email Verification Code",
      html: emailContent,
    });

    const phoneVerificationCode = crypto.randomInt(100000, 999999).toString();
    const phoneVerificationCodeExpiry = new Date(Date.now() + 30 * 60 * 1000);
    await UserService.updatePhoneVerificationCode(newUser._id, phoneVerificationCode, phoneVerificationCodeExpiry);

    return res.success(
      `Thank you for signing up. Verification codes have been sent to your email and phone. Phone verification code ==> ${phoneVerificationCode} (testing)`
    );
  } catch (error) {
    console.error("Signup error:", error);
    return res.serverError(error);
  }
};

module.exports.verify_email_post = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserService.readByEmail(email);
    if (!user) return res.fail("User not found.");

    if (user.isEmailVerified) {
      return res.success("Email is already verified.");
    }

    const emailVerificationCode = crypto.randomInt(100000, 999999).toString();
    const emailVerificationCodeExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes expiry

    await UserService.updateEmailVerificationCode(user._id, emailVerificationCode, emailVerificationCodeExpiry);

    const emailContent = emailTemplates.getEmailVerificationTemplate(user.firstName, emailVerificationCode);

    await mailer.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification Code",
      html: emailContent, // Use the generated HTML content
    });

    return res.success("Verification code sent to your email. Please verify within 30 minutes.");
  } catch (error) {
    console.error("Email verification error:", error);
    return res.serverError(error);
  }
};

module.exports.confirm_email_post = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await UserService.readByEmail(email);
    if (!user) return res.fail("User not found.");

    if (user.isEmailVerified) {
      return res.success("Email is already verified.");
    }

    if (!user.emailVerificationCode || user.emailVerificationCode !== code) {
      return res.fail("Invalid email verification code.");
    }

    if (Date.now() > new Date(user.emailVerificationCodeExpiry)) {
      return res.fail("Email verification code has expired.");
    }

    await UserService.updateEmailVerificationStatus(user._id, true);
    return res.success("Email verified successfully.");
  } catch (error) {
    console.error("Confirm email error:", error);
    return res.serverError(error);
  }
};

module.exports.verify_phone_post = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await UserService.readByPhone(phone);
    if (!user) return res.fail("User not found.");

    if (user.isPhoneVerified) {
      return res.success("Phone is already verified.");
    }

    const phoneVerificationCode = crypto.randomInt(100000, 999999).toString();
    const phoneVerificationCodeExpiry = new Date(Date.now() + 30 * 60 * 1000);

    await UserService.updatePhoneVerificationCode(user._id, phoneVerificationCode, phoneVerificationCodeExpiry);

    return res.success(
      `Phone verification code generated. Please verify using the code "${phoneVerificationCode}". (Testing)`
    );
  } catch (error) {
    console.error("Phone verification error:", error);
    return res.serverError(error);
  }
};

module.exports.confirm_phone_post = async (req, res) => {
  try {
    const { phone, code } = req.body;

    const user = await UserService.readByPhone(phone);
    if (!user) return res.fail("User not found.");

    if (user.isPhoneVerified) {
      return res.success("Phone is already verified.");
    }

    if (!user.phoneVerificationCode || user.phoneVerificationCode !== code) {
      return res.fail("Invalid phone verification code.");
    }

    if (Date.now() > new Date(user.phoneVerificationCodeExpiry)) {
      return res.fail("Phone verification code has expired.");
    }

    await UserService.updatePhoneVerificationStatus(user._id, true);
    return res.success("Phone verified successfully.");
  } catch (error) {
    console.error("Confirm phone error:", error);
    return res.serverError(error);
  }
};

module.exports.login_local_post = async (req, res) => {
  try {
    const { email, password } = await joiSchemas.local_login_post.validateAsync(req.body);

    const user = await UserService.loginUser({ email, password });

    return res.success(generateToken(user));
  } catch (error) {
    console.error("Login Error:", error);
    return res.fail(error.message);
  }
};

module.exports.me_get = async (req, res) => {
  try {
    res.success(req.user);
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.change_password_post = async (req, res) => {
  try {
    const results = await joiSchemas.change_password_post.validateAsync(req.body);
    isPasswordValid = await UserService.validatePassword(req.user._id, results.currentPassword);
    if (!isPasswordValid) return res.fail("Incorrect Current Password");
    await UserService.updatePassword(req.user._id, results.newPassword);
    return res.success("Password changed successfully");
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.forgot_password_post = async (req, res) => {
  try {
    const results = await joiSchemas.forgot_password_post.validateAsync(req.body);
    const user = await UserService.readByEmail(results.email);

    if (!user) {
      return res.fail("User with this email is not signed up yet.");
    }

    const forgotPasswordCode = crypto.randomInt(100000, 999999);
    const passwordResetCodeExpiry = new Date(Date.now() + 30 * 60 * 1000); //30 min

    await UserService.updateForgotPasswordCode(user._id, {
      passwordResetCodeExpiry,
      forgotPasswordCode,
    });

    const resetPasswordUrl = `https://vetmedmatch.vetucore.com/auth/reset-password?email=${results.email}&otp=${forgotPasswordCode}`;

    const emailContent = emailTemplates.generateResetLinkTemplate(user.firstName, resetPasswordUrl);

    await mailer.sendMail({
      from: process.env.EMAIL_USER,
      to: results.email,
      subject: "Reset Your Password",
      html: emailContent,
    });

    return res.success("A reset password link has been sent to your email.");
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.serverError(error);
  }
};

module.exports.reset_password_post = async (req, res) => {
  try {
    const results = await joiSchemas.reset_password_post.validateAsync(req.body);
    let user = await UserService.readByEmail(results.email);
    if (!user) return res.fail("User with this email is not SignUp yet");
    if (user.forgotPasswordCode !== Number(results.forgotPasswordCode) || Date.now() > user.passwordResetCodeExpiry) {
      return res.fail("Invalid or expired reset code.");
    }
    await UserService.updatePassword(user._id, results.newPassword);
    return res.success("Password has been updated");
  } catch (error) {
    return res.serverError(error);
  }
};
