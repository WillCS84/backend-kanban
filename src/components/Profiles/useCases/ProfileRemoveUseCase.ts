import { IProfileRepository } from "../../../repositories/interfaces/profileInterface"

export class ProfileRemoveUseCase {
  constructor(private profileRepository: IProfileRepository) {}

  async removeProfile(id_profile: number) {
    if (!id_profile)
      throw {
        error: true,
        message: "Id do perfil é obrigatório!",
        status: 400
      }

    return await this.profileRepository.removeProfile(id_profile)
  }
}
