import Joi from 'joi';
import Company from './company.model';

export default {
  async create(req, res) {
    try {
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        GIIN: Joi.string().required(),
        address: Joi.string().required(),
        numval: Joi.string().required(),
      });
      const { value, error } = Joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const company = await Company.create(Object.assign({}, value, { user: req.user._id }));
      return res.json(company);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async findAll(req, res) {
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 20) || 1,
        limit: parseInt(perPage, 20) || 20,
        // populate: {
        //   path: 'user',
        //   select: 'firstName lastName',
        // },
      };
      const companies = await Company.paginate({}, options);
      console.log(companies , 'companies')
      return res.json(companies);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const company = await Company.findById(id).populate('user', 'firstName lastName');
      if (!company) {
        return res.status(404).json({ err: 'could not find company' });
      }
      return res.json(company);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const company = await Company.findOneAndRemove({ _id: id });
      if (!company) {
        return res.status(404).json({ err: 'could not find company' });
      }
      return res.json(company);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  
  async update (req, res) {
    try {
      const { id } = req.params
      const schema = Joi.object().keys({
        name: Joi.string().optional(),
        GIIN: Joi.string().optional(),
        address: Joi.string().optional(),
        numval: Joi.number().optional()
      });
      const { value, error } = Joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const company = await Company.findOneAndUpdate({ _id: id }, value, { new: true });
      if (!company) {
        return res.status(404).json({ err: 'could not find company' });
      }
      return res.json(company);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
};
