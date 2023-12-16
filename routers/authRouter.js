/*============ IMPORT USED MODULES ============*/
const express = require('express');
const { validationResult } = require('express-validator');

const authController = require('../controllers/authController');
const { loginLimiter } = require('../middleware/rateLimiter');

const ErrorHandler = require('../_errors/errorHandler');
const ValidationErrorHandler = require('../_validation/validationErrorHandler');
const userValidationRule = require('../_validation/validators/userValidator');

const { authLogs } = require('../_logs/auth/authLogger');


/*============ EXPRESS ROUTER ============*/
let router = express.Router();


/*============ MIDDLEWARE REQUEST LOGS ============*/
router.use(authLogs);


/*============ ROUTES FOR AUTHENTIFICATION ============*/

/*=== LOGIN ===*/
router.post('/', [
    userValidationRule,
    loginLimiter,
    (req, res, next) => {

        try {
            // Check presence of data email && password
            const { email, password } = req.body;

            if (!email || !password ) {
                return res.status(400).json({ message: 'Invalid data!' });
            }

            // Pass to validation middleware
            next();
        }
        catch (err) {
            return ErrorHandler.sendInternalServerError(res, err);
        }
    }
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return ValidationErrorHandler.handle(res, errors);
        }

        await authController.login(req, res);
    }
    catch (err) {
        return ErrorHandler.sendInternalServerError(res, err);
    }
});


/*============ EXPORT MODULE ============*/
module.exports = router;