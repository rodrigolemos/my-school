import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'

export async function confirmClientIdEqualsParameter(client_id: string, param_id: string): Promise<boolean> {
  if (!client_id || !param_id)
    throw new AppError({
      status: 1,
      message: 'Your id must be provided'
    }, 403)

  if (client_id !== param_id)
    return false

  return true
}

export default async function ensureOnlyItself(request: Request, _: Response, next: NextFunction): Promise<void> {
  try {
    if (typeof request.headers.client_id !== 'string')
      throw new AppError({
        status: 1,
        message: 'Invalid client_id token'
      }, 401)

    // GET, DELETE routes
    let param_id = request.params.id

    // POST, PUT, PATCH routes
    if (!param_id)
      param_id = request.body.id

    if (!await confirmClientIdEqualsParameter(request.headers.client_id, param_id))
      throw new AppError({
        status: 2,
        message: 'Unauthorized'
      }, 401)

    return next()
  } catch (err) {
    throw new AppError(err.message, err.statusCode)
  }
}
