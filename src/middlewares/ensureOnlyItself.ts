import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/AppError'

export async function confirmClientIdEqualsParameter(client_id: string, param_id: string): Promise<boolean> {
  console.log(param_id)
  if (!client_id || !param_id)
    throw new AppError('Your id must be provided', 403)

  if (client_id !== param_id)
    return false

  return true
}

export default async function ensureOnlyItself(request: Request, _: Response, next: NextFunction): Promise<void> {
  try {
    if (typeof request.headers.client_id !== 'string')
      throw new AppError('Invalid client_id token', 401)

    console.log(request.params)
    if (!await confirmClientIdEqualsParameter(request.headers.client_id, request.params.id))
      throw new AppError('Unauthorized', 401)

    return next()
  } catch (err) {
    throw new AppError(err.message, err.statusCode)
  }
}
