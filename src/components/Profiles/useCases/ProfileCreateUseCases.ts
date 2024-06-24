import { Profile } from "../../../entities/Profiles/Profiles"
import { IProfileRepository, IProfileRequestDTO } from "../../../repositories/interfaces/profileInterface"
import { ProfileFindByDescription } from "./ProfileFindByDescriptionUseCase"

export class ProfileCreateUseCase {
  constructor(
    private profileRepository: IProfileRepository,
    private profileFindByDescription: ProfileFindByDescription
  ) {}

  async createProfile(profile: IProfileRequestDTO) {
    await this.validateProfile(profile)

    const { description } = profile

    const profileAlreadyExists = await this.profileFindByDescription.findByDescription(description)

    if (!profileAlreadyExists.error) {
      throw {
        error: true,
        message: `Já existe um perfil com essa descrição: ${description}`,
        status: 401
      }
    }

    const newProfile = new Profile(profile)

    return await this.profileRepository.saveProfile(newProfile)
  }

  private validateProfile = async (data: IProfileRequestDTO) => {
    const { description, role } = data

    let message = undefined

    if (!description || description === " ") message = "Não foi possível localizar a descrição do perfil"
    if (!role || role === " ") message = "Não foi possível localizar a permissão do perfil"

    if (message) {
      throw {
        error: true,
        message: message,
        status: 400
      }
    }
  }
}
