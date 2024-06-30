
const jwt = require('jsonwebtoken')
const ensureAuthenticated = async (req, res, next) =>{
    if(!req.headers['authorization']){
        return res.status(403)
        .json({message : 'Token is required'})
    }
    try {
        const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET);
        next();

    } catch (err) {
        return res.status(403)
            .json({message : "Token is invaild or Token is expired"});
    }
};

module.exports = ensureAuthenticated;