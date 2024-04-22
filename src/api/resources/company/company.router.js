import express from 'express';
import passport from 'passport';

import companyController from './company.controller';
import { isAdmin } from '../../middlewares/is-admin';

export const companyRouter = express.Router();
// 1.authenticated user can view all the company
// 2.an admin can create, update, and delete companies

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];
companyRouter
  .route('/')
  .post(adminPolicy, companyController.create)
  .get(passport.authenticate('jwt', { session: false }), companyController.findAll);
  
companyRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), companyController.findOne)
  .delete(adminPolicy, companyController.delete)
  .put(adminPolicy, companyController.update);
