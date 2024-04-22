import Joi from 'joi'
import Statement from './statement.model'
import statementService from './statement.service'

export default {
  async create (req, res) {
    try {
      const { value, error } = statementService.validateBody(req.body)
      if (error && error.details) {
        return res.status(400).json(error)
      }
      const statement = await Statement.create(Object.assign({}, value, { user: req.user._id }))
      return res.json(statement)
    } catch (err) {
      console.error(err)
      return res.status(500).send(err)
    }
  },
  async findAll (req, res) {

    
    try {
      
      const statements = await Statement.find().populate('company').populate('user', 'userName firstName lastName').sort({ CreationDate: -1 })
     
      return res.json(statements)
    } catch (err) {
      console.error(err)
      return res.status(500).send(err)
    }
  },
  async findOne (req, res) {
    try {
      const { id } = req.params
      const statement = await Statement.findById(id).populate('user', 'userName firstName lastName').populate('company')
      if (!statement) {
        return res.status(404).json({ err: 'could not find statement' })
      }
      return res.json(statement)
    } catch (err) {
      console.error(err)
      return res.status(500).send(err)
    }
  },
  // async delete(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const company = await Company.findOneAndRemove({ _id: id });
  //     if (!company) {
  //       return res.status(404).json({ err: 'could not find company' });
  //     }
  //     return res.json(company);
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).send(err);
  //   }
  // },
  async update (req, res) {
    try {
      const { id } = req.params
      const schema = Joi.object().keys({
        company: Joi.object().optional(),
        ReportingPeriod: Joi.string().optional(),
        CreationDate: Joi.string().optional(),
        DeclarationType: Joi.string().optional(),
        ReportingType: Joi.string().optional(),
        DeclarationContent: Joi.string().optional(),
        OriginID: Joi.string().optional(),
        Statuts: Joi.string().optional()
      })
      const { value, error } = Joi.validate(req.body, schema)
      if (error && error.details) {
        return res.status(400).json(error)
      }
      const statement = await Statement.findOneAndUpdate({ _id: id }, value, { new: true })
      if (!statement) {
        return res.status(404).json({ err: 'could not find a statement' })
      }
      else {
      return res.json(statement)
      }
    } catch (err) {
      console.error(err)
      return res.status(500).send(err)
    }
  },
  async updateStatus (req, res) {
    try {
      const { id } = req.params.id
      const schema = Joi.object().keys({
        Statuts: Joi.string().required()
      })
      const { value, error } = Joi.validate(req.body, schema)
      if (error && error.details) {
        return res.status(400).json(error)
      }
      const statement = await Statement.findOneAndUpdate({ _id: id }, value, { new: true })
      if (!statement) {
        return res.status(404).json({ err: 'could not find a statement' })
      }
      else {
      return res.json(statement)
      }
    } catch (err) {
      console.error(err)
      return res.status(500).send(err)
    }
  }
}
