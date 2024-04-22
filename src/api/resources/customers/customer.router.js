import express from 'express'
import passport from 'passport'

import customerController from './customer.controller'


export const customerRouter = express.Router()
// 1.authenticated user can view all the statements
// 2.an admin can create, update, and delete statements


customerRouter
  .route('/customers')
  .get(customerController.findAll)
 customerRouter
 .route('/portfolio/:YEAR/:COMPANYID')
 .get(customerController.getportfolio)
  
