import { IUserRepository } from "../../../repositories/interfaces/userInterface"

export class FindUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) {}

  async findByEmail(email: string) {
    if (!email || email === " ") {
      throw {
        error: true,
        message: "EMail do usuário é obrigatório!",
        status: 400
      }
    }
    return await this.userRepository.findUserByEmail(email)
  }
}
