
const asyncWrapper = require('../middleware/asyncWrapper');
const admin = require('../models/admin');
const bcrypt = require('bcrypt');
const genJWT = require('../utils/generateJWT');

const checker = asyncWrapper(async (req, res) => {
    if (req.currentUser.role !== "ADMIN") {
        return res.json({ status: "failed", message: "Forbidden" });
    }
    else{    
    return res.status(201).json({ status: "success", message: "Identity Verified" });
    }
});

// MANAGER ROLE
const addAdmin = asyncWrapper(async (req, res) => {
    if (req.currentUser.role !== "ADMIN") {
        return res.status(403).json({ status: "failed", message: "Forbidden" });
    }
    const newAdmin = new admin(req.body);
    await newAdmin.save();
    return res.status(201).json({ status: "success", data: { newAdmin } });
});

const adminLogin = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ errorMsg: "Email and Password are required" });
    }
    const emailCheck = await admin.findOne({ email: email });
    if (emailCheck) {
        const passwordCheck = await bcrypt.compare(password, emailCheck.password);
        if (passwordCheck) {
            const token = await genJWT({
                __id: emailCheck.__id,
                email: emailCheck.email,
                role: emailCheck.role
            });
            return res.status(200).json({
                status: "success",
                message: "Logged in successfully",
                data: { token }
            });
        } else {
            return res.status(401).json({
                status: "failed",
                message: "Login failed"
            });
        }
    } else {
        return res.status(400).json({
            status: "failed",
            message: "Email or Password is incorrect"
        });
    }
});

// MANAGER ROLE
const getAdmins = asyncWrapper(async (req, res) => {
    if (req.currentUser.role !== "ADMIN") {
        return res.status(403).json({ status: "failed", message: "Forbidden" });
    }
    const admins = await admin.find().select('-__v');
    return res.status(200).json({ status: "success", data: admins });
});

const adminUpdateData = asyncWrapper(async (req, res) => {
    if (req.currentUser.role !== "ADMIN") {
        return res.status(403).json({ status: "failed", message: "Forbidden" });
    }
    const { email, newdata } = req.body;
    const updatedAdmin = await admin.updateOne(
        { email: email },
        { $set: newdata }
    );
    return res.status(200).json({ status: "success", data: updatedAdmin });
});

// MANAGER ROLE
const deleteAdmin = asyncWrapper(async (req, res) => {
    if (req.currentUser.role !== "ADMIN") {
        return res.status(403).json({ status: "failed", message: "Forbidden" });
    }
    const { email } = req.body;
    const deletedRecord = await admin.deleteOne({ email: email });
    return res.status(200).json({ status: "success", message: "Record deleted successfully" });
});

module.exports = {
    addAdmin,
    adminLogin,
    getAdmins,
    adminUpdateData,
    deleteAdmin,
    checker
};
