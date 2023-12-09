const jwt = require('jsonwebtoken')

module.exports = (requiredRole) => {
    return (req, res, next) => {
        const token = req.header('auth-token');

        if (!token) return res.status(401).send('Access Denied');

        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            if(!verified.role||verified.role !== requiredRole){
                return res.status(403).send('Permission denied')
            }

            next();
        } catch (err) {
            return res.status(400).send('Invalid Token')
        }
    }

}