import { IProfileRepository, IProfileRequestDTO } from "../../../repositories/interfaces/profileInterface"
import { ProfileFindByDescription } from "./ProfileFindByDescriptionUseCase"

export class ProfileUpdateUseCase {
  constructor(
    private profileRepository: IProfileRepository,
    private profileFindByDescription: ProfileFindByDescription
  ) {}

  async updateProfile(id_profile: number, data: IProfileRequestDTO) {
    const { description, role } = data

    if (!id_profile) {
      throw {
        error: true,
        message: "Id do perfil é Obrigatório!",
        status: 400
      }
    }

    if (description) {
      const descriptioProfileAlreadyExists = await this.profileFindByDescription.findByDescription(description)

      if (!descriptioProfileAlreadyExists.error) {
        throw {
          error: true,
          message: `Já existe um perfil cadastrado com essa descrição: ${description}!`,
          status: 401
        }
      }
    }

    if ((!role && !description) || (role === " " && description === " ")) {
      throw {
        error: true,
        message: `Nenhum item encontrado para atualização!`,
        status: 401
      }
    }
    return await this.profileRepository.updateProfile(id_profile, data)
  }
}
