import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/User'
import AppError from '../utils/AppError'

export default async function ensurePermission(request: Request, _: Response, next: NextFunction): Promise<void> {
  const clientID = request.headers.client_id;

  if (!clientID)
    throw new AppError('JWT token is missing', 403)

  const user = await getRepository(User).findOne({
    where: {
      email: clientID
    }
  })

  if (!user || user.role !== 'admin')
    throw new AppError('Unauthorized', 401)

  return next()
}
