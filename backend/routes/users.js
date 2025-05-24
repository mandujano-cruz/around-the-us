const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateAvatar,
  updateProfile
} = require('../controllers/users');

const {
  validateUserIdParam,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require('../middleware/validators');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserIdParam, getUserById);
// router.post('/', createUser);
router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;