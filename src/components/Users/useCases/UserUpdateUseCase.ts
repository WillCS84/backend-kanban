import { ResponseRepository } from "../../../Utils/interfaces"
import { IUserRepository, IUserRequestDTO } from "../../../repositories/interfaces/userInterface"

export class UpdateUserUseCase {
  constructor(private updateUserRepository: IUserRepository) {}

  updateUser = async (id_user: string, fields: Omit<IUserRequestDTO, "id_user">) => {
    if (!id_user) {
      throw { error: true, message: "Id do Usuário é obrigatório!", status: 401 }
    }

    if (fields.email) {
      const emailAlreadyExists: ResponseRepository<IUserRequestDTO> = await this.updateUserRepository.findUserByEmail(
        fields.email
      )

      if (!emailAlreadyExists.error && emailAlreadyExists.response.id_user !== id_user) {
        throw { error: true, message: "esse email já está vinculadoa outro usuário!", status: 401 }
      }
    } else {
      if (!fields.name && !fields.id_profile) {
        throw { error: true, message: "Nenhum item para ser alterado!", status: 400 }
      }
    }

    return await this.updateUserRepository.updateUser(id_user, fields)
  }
}
