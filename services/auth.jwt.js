const jwt = require('jsonwebtoken');
const jwt_secret = "3-C0mm3rc3"
module.exports = function(req, res, next) {
    let token = req.headers["authorization"];

    if (token) {
        jwt.verify(token, jwt_secret, function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'authentication failed'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403).json({
            success: false,
            message: 'No token provided'
        });
    }
}