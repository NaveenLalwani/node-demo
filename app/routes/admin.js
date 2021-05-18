const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const IsAdminMiddleware = require('../middlewares/IsAdminMiddleware');

router.patch("/update-role/:admin_name", adminController.updateRole);
router.get("/sync-user-list/:admin_name", IsAdminMiddleware, adminController.syncUserList);

module.exports = router;
