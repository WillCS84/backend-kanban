import { IProfileRepository } from "../../../repositories/interfaces/profileInterface"
import { IUserRepository } from "../../../repositories/interfaces/userInterface"

export class RemoveUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async removeUser(id_user: string) {
    if (!id_user)
      throw {
        error: true,
        message: "Id do Usuário é obrigatório!",
        status: 400
      }

    return await this.userRepository.removeUser(id_user)
  }
}
