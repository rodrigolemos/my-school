import { Request, Response } from 'express'

import ListUsersService from '../services/ListUsersService'
import CreateUserService from '../services/CreateUserService'
import UpdateUserService from '../services/UpdateUserService'

class UserController {

  public async index(req: Request, res: Response): Promise<Response> {
    const listUsersService = new ListUsersService()
    const users = await listUsersService.execute(req.params)
    return res.send(users)
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const createUserService = new CreateUserService()
    const user = await createUserService.execute(req.body)
    return res.status(201).send(user)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserService = new UpdateUserService()
    const user = await updateUserService.execute(req.body)
    return res.send(user)
  }

}

export default new UserController
