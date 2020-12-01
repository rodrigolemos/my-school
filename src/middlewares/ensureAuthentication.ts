import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'
import AppError from '../utils/AppError'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(request: Request, _: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    throw new AppError('Token was not provided', 401)

  const [, token] = authHeader.split(' ')

  try {
    const { secret } = authConfig.jwt

    if (!secret)
      throw new AppError('Internal server error', 500)

    const decoded = verify(token, secret)

    const { sub } = decoded as TokenPayload

    request.headers.client_id = sub

    return next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}
