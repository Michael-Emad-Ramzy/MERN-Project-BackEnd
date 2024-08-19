const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const verfiyAdminToken = require('../middleware/verifyAdminToken');

router.route('/add')
    .post(verfiyAdminToken, adminController.addAdmin)

router.route('/login')
    .post(adminController.adminLogin)

router.route('/admins')
    .get(verfiyAdminToken, adminController.getAdmins)

router.route('/updateadmin')
    .patch(verfiyAdminToken, adminController.adminUpdateData)

router.route('/delete')
    .delete(verfiyAdminToken, adminController.deleteAdmin)

router.route('/')
    .post(adminController.adminLogin)

module.exports = router;