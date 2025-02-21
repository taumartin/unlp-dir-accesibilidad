const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth');
const jwtAuthRequired = require("../../middlewares/jwt-auth-required");

/** Register a new User. */
router.post('/signup', authController.signupValidation, authController.signup);
/** User LogIn. */
router.post('/login', authController.loginValidation, authController.login);
/** User LogOut. */
router.post('/logout', authController.logout);
/** Refresh JWT Access Token. */
router.post('/refresh', authController.refresh);
/** Get User Profile. */
router.get('/me', jwtAuthRequired, authController.me);

module.exports = router;
