import { ResponseRepository } from "../../Utils/interfaces"
import { User } from "../../entities/Users/Users"

export interface IUserRequestDTO {
  id_user?: string
  email: string
  name: string
  password: string
  id_profile: number
}

export interface IUserRepository {
  saveUser(user: User): Promise<ResponseRepository>
  updateUser(id_user: string, user: Omit<IUserRequestDTO, "id_user">): Promise<ResponseRepository>
  findAllUser(): Promise<ResponseRepository>
  removeUser(id_user: string): Promise<ResponseRepository>
  findUserByEmail(email: string): Promise<ResponseRepository<IUserRequestDTO>>
  authLogin(email: string, password: string): Promise<ResponseRepository>
}
