const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const verfiyAdminToken = require('../middleware/verfiyToken');

router.route('/')
    .post(verfiyAdminToken, adminController.addAdmin)
    .get(verfiyAdminToken, adminController.getAdmins)
    .patch(verfiyAdminToken, adminController.adminUpdateData)
    .delete(verfiyAdminToken, adminController.deleteAdmin)

router.route('/adminlogin')
    .post(adminController.adminLogin)

router.route('/checker')
    .get(verfiyAdminToken, adminController.checker)

module.exports = router;