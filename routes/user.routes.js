const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { ensureAuthenticated } = require('../middlewares/auth.mw');

router.post('/signup', userController.signup_local_post);
router.post('/verify-email', userController.verify_email_post); //resend code
router.post('/confirm-email', userController.confirm_email_post);
router.post('/verify-phone', userController.verify_phone_post); //resend code
router.post('/confirm-phone', userController.confirm_phone_post);
router.post('/login', userController.login_local_post);
router.get('/me', ensureAuthenticated, userController.me_get);
router.post('/change-password', ensureAuthenticated, userController.change_password_post);
router.post('/forgot-password', userController.forgot_password_post);
router.post('/reset-password', userController.reset_password_post);

module.exports = router;
