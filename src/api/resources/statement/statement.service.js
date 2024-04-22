import Joi from 'joi';

export default {
  validateBody(body) {
    const schema = Joi.object().keys({
        company: Joi.object().required(),
        ReportingPeriod: Joi.string().required(),
        CreationDate: Joi.string().required(),
        DeclarationType: Joi.string().required(),
        ReportingType: Joi.string().required(),
        DeclarationContent: Joi.string().required(),
        OriginID : Joi.string().optional(),
        Statuts :Joi.string().required(),
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
};
