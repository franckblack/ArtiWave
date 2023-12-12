/*============ IMPORT USED MODULES ============*/
const jwt = require('jsonwebtoken');
const fs = require('fs');

const ErrorHandler = require('../miscellaneous/errorHandler');


/*============ EXTRACT TOKEN FROM HEADER ============*/
const extractBearer = authorization => {
    if (typeof authorization !== 'string') {
        return false;
    }
    // Regexp to isole token
    const matches = authorization.match(/(bearer)\s+(\S+)/i);

    return matches && matches[2];
}


/*============ CHECK IF TOKEN IS PRESENT AND CHECK IT ============*/
const checkTokenMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization && extractBearer(req.headers.authorization);
        console.log('### HEADERS:', req.headers);
        console.log('### TOKEN:', token);
        if (!token) {
            return res.status(401).json({ message: 'Nice try!!!'});
        }

        // Check JWT
        const publicKeyPath = process.env.PUBLIC_KEY_PATH;
        const publicKey = fs.readFileSync(publicKeyPath);

        jwt.verify(token, publicKey, { algorithms: ['RS512'] }, function (err, decodedToken) {
            if (err) {
                console.log('ERR TOKEN:', err);
                return res.status(401).json({message: 'False token!'});
            }
            console.log('DECODED TOKEN:', decodedToken);
            next();
        });
    }
    catch (err) {
        return ErrorHandler.sendInternalServerError(res, err);
    }
}


/*============ EXPORT MODULE ============*/
module.exports = checkTokenMiddleware;