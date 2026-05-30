const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  deleteProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  sendOtp,
  verifyOtp,
  resendVerification,
  jwtGenerateToken,
  jwtVerifyToken,
  jwtRefreshToken,
  jwtRevokeToken
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');

// Auth routes
router.post('/auth/register', validateRegister, register);
router.post('/auth/login', validateLogin, login);
router.post('/auth/logout', logout);
router.get('/auth/profile', protect, getProfile);
router.patch('/auth/profile', protect, updateProfile);
router.delete('/auth/profile', protect, deleteProfile);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);
router.post('/auth/change-password', protect, changePassword);
router.post('/auth/verify-email', verifyEmail);
router.post('/auth/send-otp', sendOtp);
router.post('/auth/verify-otp', verifyOtp);
router.post('/auth/resend-verification', resendVerification);

// JWT practice routes
router.get('/jwt/profile', protect, getProfile);
router.get('/jwt/dashboard', protect, (req, res) => {
  res.status(200).json({ message: 'Welcome to JWT protected dashboard', user: req.user });
});
router.post('/jwt/generate-token', jwtGenerateToken);
router.post('/jwt/verify-token', jwtVerifyToken);
router.post('/jwt/refresh-token', jwtRefreshToken);
router.delete('/jwt/revoke-token', jwtRevokeToken);
router.get('/jwt/private-employees', protect, (req, res) => {
  res.status(200).json({ message: 'Welcome to protected employee records' });
});
router.get('/jwt/private-projects', protect, (req, res) => {
  res.status(200).json({ message: 'Welcome to protected project records' });
});
router.get('/jwt/private-tasks', protect, (req, res) => {
  res.status(200).json({ message: 'Welcome to protected task records' });
});
router.get('/jwt/private-analytics', protect, (req, res) => {
  res.status(200).json({ message: 'Welcome to protected analytics' });
});

module.exports = router;
