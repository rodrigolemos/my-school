import { Request, Response } from 'express'
import ListUsersService from '../services/ListUsersService'

class UserController {

  public async index(req: Request, res: Response) {
    const listUsersService = new ListUsersService()
    const users = await listUsersService.execute()
    return res.send(users)
  }
}

export default new UserController
