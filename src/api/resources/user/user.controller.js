import userService from './user.service';
import User, { STANDARD_ROLE } from './user.model';
import jwt from '../../helpers/jwt';
import Joi from 'joi';

export default {
  async signup (req, res) {
    try {
      const { value, error } = userService.validateSignup(req.body);
     
      if (error) {
        return res.status(400).json(error);
      }
      const encryptedPass = userService.encryptPassword(value.password);

      await User.create({
        email: value.email,
        userName: value.userName, 
        firstName: value.firstName,
        lastName: value.lastName,
        password: encryptedPass,
        role: value.role || STANDARD_ROLE
      })
      return res.json({ success: true })
    } catch (err) {
      console.error(err);
      return res.status(500).send(err)
    }
  },
  async login (req, res) {
    try {
      const { value, error } = userService.validateLogin(req.body) ;
      if (error) {
        return res.status(400).json(error);
      }
      // const user = await User.findOne({ email: value.email });
      const user = await User.findOne({ userName: value.userName })
      console.log (Array.from(User.find()), 'rrrrrrrrrrrrr')
      if (!user) {
        return res.status(401).json({ err: 'There is no user with this credentials!' })
      }
      const authenticted = userService.comparePassword(value.password, user.password)
      console.log (value.password ,  user.password , authenticted , 'ffffffff')
      if (!authenticted) {
        return res.status(401).json({ err: 'You typed a wrong password for the user <<' + value.userName + '>>' })
      }
      const token = jwt.issue({ id: user._id }, '1d')
 
      return res.json({ token })
    } catch (err) {
      return res.status(500).send(err)
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const schema = Joi.object().keys({

  
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      email: Joi.string().email().optional(),
      userName: Joi.string().optional(),
      password: Joi.string().optional(),
      role: Joi.number().optional(),
     
        
      });
      const { value, error } = Joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const user = await User.findOneAndUpdate({ _id: id }, value, { new: true });
      if (!user) {
        return res.status(404).json({ err: 'could not find user' });
      }
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async authenticate (req, res) {
    console.log(JSON.stringify(req.user))
    return res.json(req.user)
  },
  async findAll (req, res) {
    try {
      const users = await User.find()
      return res.json(users)
    } catch (err) {
      return res.error(err)
    }
  }
}
