import { Request, Response } from 'express'

import ListUsersService from '../services/ListUsersService'
import CreateUserService from '../services/CreateUserService'

class UserController {

  public async index(req: Request, res: Response) {
    const listUsersService = new ListUsersService()
    const users = await listUsersService.execute()
    return res.send(users)
  }

  public async store(req: Request, res: Response) {
    const createUserService = new CreateUserService()
    const user = await createUserService.execute(req.body)
    return res.send(user)
  }

}

export default new UserController
