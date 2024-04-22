import express from 'express'
import passport from 'passport'
import userController from './user.controller'
import { isAdmin } from '../../middlewares/is-admin'

export const userRouter = express.Router()
const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin]
userRouter.post('/signup',  userController.signup)
userRouter.post('/login', userController.login)
userRouter.get('/me', passport.authenticate('jwt', { session: false }), userController.authenticate)
userRouter.route('/').get(adminPolicy, userController.findAll)

userRouter
  .route('/:id')
  .put(adminPolicy, userController.update)
