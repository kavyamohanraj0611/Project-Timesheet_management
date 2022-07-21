const joi = require('@hapi/joi')

const registerValidation=(data)=>{
    const schema=joi.object({
        first_name: joi.string().required(),
        last_name:joi.string().required(),
        employeeId:joi.string().pattern(new RegExp('^(ACE)[0-9]{4}$')).required(),
        emailId:joi.string().pattern(new RegExp('^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$')).required(),
        department:joi.string().required(),
        role:joi.string().required(),
        password: joi.string().min(8).required(),
        confirmPass: joi.ref('password')
    }).with('password', 'confirmPass');
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = joi.object({
        employeeId: joi.string().min(7).required(),
        password: joi.string().min(8).required()
    })
    return schema.validate(data)
}

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;