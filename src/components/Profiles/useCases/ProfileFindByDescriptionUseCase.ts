import { IProfileRepository } from "../../../repositories/interfaces/profileInterface"

export class ProfileFindByDescription {
  constructor(private profileRepository: IProfileRepository) {}

  async findByDescription(description: string) {
    if (!description || description === " ") {
      throw {
        error: true,
        message: "Descrição do perfil é obrigatório!",
        status: 400
      }
    }
    return await this.profileRepository.findByDescription(description)
  }
}
