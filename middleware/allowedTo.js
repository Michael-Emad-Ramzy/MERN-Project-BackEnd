const AppError = require("../utils/AppError")

module.exports = (...roles) => {
    

    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
           return next(AppError.create('this role is not allowed to do this', 401))
        }
        next()
    }
}