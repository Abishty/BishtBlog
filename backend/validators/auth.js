const {check} = require('express-validator')

exports.userSignupValidator = [
    check('name').not().isEmpty().withMessage('Name Is Required'),
    check('email').isEmail().withMessage('Must Be A Valid Email Address'),
    check('password').isLength({min: 6}).withMessage('Password Must Be Atleast 6 Characters Long')
]

exports.userSigninValidator = [
    check('email').isEmail().withMessage('Must Be A Valid Email Address'),
    check('password').isLength({min: 6}).withMessage('Password Must Be Atleast 6 Characters Long')
]