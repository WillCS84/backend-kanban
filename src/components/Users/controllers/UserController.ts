import { Request, Response } from "express"
import { IUserRequestDTO } from "../../../repositories/interfaces/userInterface"
import { UpdateUserUseCase } from "../useCases/UserUpdateUseCase"
import { CreateUserUseCase } from "../useCases/UserCreateUseCase"
import { FindAllUserUseCase } from "../useCases/UserFindAllUseCase"
import { RemoveUserUseCase } from "../useCases/UserRemoveUseCase"
import { FindUserByEmailUseCase } from "../useCases/UserFindByEmailUseCase"

export class UserController {
  constructor(
    private findAllUserController: FindAllUserUseCase,
    private updateUserController: UpdateUserUseCase,
    private createUserController: CreateUserUseCase,
    private removeUserController: RemoveUserUseCase,
    private findByEmailUseController: FindUserByEmailUseCase
  ) {}

  findAllUser = async (request: Request, response: Response) => {
    try {
      const userList = await this.findAllUserController.findAll()

      return response
        .status(userList?.status || 201)
        .json({ error: userList?.error, message: userList?.message, response: userList?.response })
    } catch (error) {
      return response.status(error?.status || 400).json({ error: error?.error, message: error?.message })
    }
  }

  updateUser = async (request: Request, response: Response) => {
    const { id_user, name, email, id_profile, password } = <IUserRequestDTO>request.body

    try {
      const user = await this.updateUserController.updateUser(id_user, { name, email, id_profile, password })

      return response.status(user.status).json({ error: user.error, message: user.message, response: user.response })
    } catch (error) {
      return response.status(error.status).json({ error: error.error, message: error.message })
    }
  }

  createUser = async (request: Request, response: Response) => {
    const { email, id_profile, name, password } = <IUserRequestDTO>request.body
    try {
      const newUser = await this.createUserController.createUser({ email, id_profile, name, password })

      return response
        .status(newUser.status)
        .json({ error: newUser.error, message: newUser.message, response: newUser.response })
    } catch (error) {
      return response.status(error.status).json({ error: error.error, message: error.message })
    }
  }

  removeUser = async (request: Request, response: Response) => {
    const { id_user } = <IUserRequestDTO>request.body
    try {
      const user = await this.removeUserController.removeUser(id_user)

      return response.status(user.status).json({ error: user.error, message: user.message })
    } catch (error) {
      return response.status(error.status).json({ error: error.error, message: error.message })
    }
  }

  findByEmail = async (request: Request, response: Response) => {
    const { email } = request.body
    try {
      const user = await this.findByEmailUseController.findByEmail(email)
      return response.status(user.status).json({ error: user.error, message: user.message })
    } catch (error) {
      return response.status(error.status).json({ error: error.error, message: error.message })
    }
  }
}
