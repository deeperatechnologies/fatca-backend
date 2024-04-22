import express from 'express'
import passport from 'passport'

import statementController from './statement.controller'
import { isAdmin } from '../../middlewares/is-admin'

export const statementRouter = express.Router()
// 1.authenticated user can view all the statements
// 2.an admin can create, update, and delete statements

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin]
console.log (adminPolicy ,'hhhhhhhh')
statementRouter
  .route('/')
  .post(adminPolicy, statementController.create)
  .get(passport.authenticate('jwt', { session: false }), statementController.findAll)
statementRouter
  .route('/:id')
// .get(passport.authenticate('jwt', { session: false }), statementController.findOne)
// .delete(adminPolicy, statementController.delete)
  .put(passport.authenticate('jwt', { session: false }),statementController.update)

