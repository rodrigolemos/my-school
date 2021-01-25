import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/User'
import AppError from '../errors/AppError'

export async function checkPermission(client_id: string | number): Promise<boolean> {
  if (!client_id)
    throw new AppError('Client id was not provided', 403)

  const user = await getRepository(User).findOne({
    where: {
      id: client_id
    }
  })

  if (!user || user.role !== 'admin')
    return false

  return true
}

export default async function ensurePermission(request: Request, _: Response, next: NextFunction): Promise<void> {
  try {
    if (typeof request.headers.client_id !== 'string')
      throw new AppError('Invalid client_id token', 401)

    if (!await checkPermission(request.headers.client_id))
      throw new AppError('Unauthorized', 401)

    return next()
  } catch (err) {
    throw new AppError(err.message, err.statusCode)
  }
}
