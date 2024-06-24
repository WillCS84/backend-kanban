import { IUserRepository } from "../../../repositories/interfaces/userInterface"

export class AuthLoginUseCase {
  constructor(private authLoginRepository: IUserRepository) {}

  login = async (email: string, password: string) => {
    if (!email) {
      throw {
        error: true,
        message: "Email é obrigatório",
        status: 401
      }
    }

    if (!password) {
      throw {
        error: true,
        message: "Senha é obrigatório",
        status: 401
      }
    }

    return await this.authLoginRepository.authLogin(email, password)
  }
}
