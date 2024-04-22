import express from 'express';
import { companyRouter } from './resources/company/company.router';
import { userRouter } from './resources/user/user.router';
import { statementRouter } from './resources/statement/statement.router';
import { customerRouter } from './resources/customers/customer.router';

export const restRouter = express.Router();
 restRouter.use('/companies', companyRouter);
 restRouter.use('/users', userRouter);
 restRouter.use('/statements', statementRouter);
 restRouter.use('/customers', customerRouter);



//  restRouter.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
//     console.log("where are here ")
//   })