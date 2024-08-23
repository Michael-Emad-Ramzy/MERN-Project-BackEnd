const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const verfiyAdminToken = require('../middleware/verfiyToken');

router.route('/')
    .post(verfiyAdminToken, adminController.addAdmin)
    .get(verfiyAdminToken, adminController.getAdmins)
    .patch(verfiyAdminToken, adminController.adminUpdateData)
    .delete(verfiyAdminToken, adminController.deleteAdmin)

router.route('/login')
    .post(adminController.adminLogin)

module.exports = router;