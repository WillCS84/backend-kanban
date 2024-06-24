import { IUserRepository } from "../../../repositories/interfaces/userInterface"

export class FindAllUserUseCase {
  constructor(private findAllUseRepository: IUserRepository) {}

  findAll = async () => {
    return await this.findAllUseRepository.findAllUser()
  }
}
