const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  schemas: {
    authenticationSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    }),
    taskAddSchema: Joi.object().keys({
      action: Joi.string().required(),
      star: Joi.bool(),
      done: Joi.bool()
    }),
    taskDeleteSchema: Joi.object().keys({
      id: Joi.objectId().required()
    }),
    taskUpdateSchema: Joi.object().keys({
      id: Joi.objectId().required(),
      action: Joi.string(),
      star: Joi.bool(),
      done: Joi.bool()
    })
  }
};
