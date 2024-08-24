const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const adminRoles = require('../utils/adminRoles');

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: [validator.isStrongPassword, "Invalid password"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, "Invalid email"]
    },
    photo: {
        type: String,
        default: 'No Photo'
    },
    role: {
        type: String,
        enum: [adminRoles.ADMIN, adminRoles.MANAGER],
        default: adminRoles.ADMIN
    }
},
    {
        timestamps: true
    })

adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt)
        }
        catch (err) {
            return next(err);
        }
    }
    next();
})


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
