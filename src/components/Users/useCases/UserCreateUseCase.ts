import { User } from "../../../entities/Users/Users"
import { IUserRepository, IUserRequestDTO } from "../../../repositories/interfaces/userInterface"
import { FindUserByEmailUseCase } from "./UserFindByEmailUseCase"

export class CreateUserUseCase {
  constructor(private userCreateRepository: IUserRepository, private userFindByEmail: FindUserByEmailUseCase) {}

  async createUser(user: IUserRequestDTO) {
    await this.validateUser(user)

    const userAlreadyExists = await this.userFindByEmail.findByEmail(user.email)

    if (!userAlreadyExists.error) {
      throw {
        error: true,
        message: `Já existe um usuário com esse email: ${user.email}`,
        status: 401
      }
    }

    const newUser = new User(user)

    return await this.userCreateRepository.saveUser(newUser)
  }

  private validateUser = async (data: IUserRequestDTO) => {
    const { email, id_profile, password, name } = data

    let message = undefined

    if (!email || email === " ") message = "Não foi possível localizar a email do usuário!"
    if (!id_profile) message = "Não foi possível localizar o perfil do usuário!"
    if (!name || name === " ") message = "Não foi possível localizar o nome do usuário!"
    if (!password) message = "Não foi possível localizar a senha!"

    if (message) {
      throw {
        error: true,
        message: message,
        status: 400
      }
    }
  }
}
