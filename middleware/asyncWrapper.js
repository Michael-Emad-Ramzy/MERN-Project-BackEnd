
function asyncWrapper(asyncfc) {
    
    return (req, res, next) => {
        asyncfc(req, res, next)
            .catch((err) => {
                res.status(500).json({ errorMessage: err.message })
                next()
            })
    }
}

module.exports = asyncWrapper;