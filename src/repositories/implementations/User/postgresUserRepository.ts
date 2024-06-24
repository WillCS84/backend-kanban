import { prisma } from "../../../database"
import { User } from "../../../entities/Users/Users"
import { ResponseRepository } from "../../../Utils/interfaces"
import { IProfileRequestDTO } from "../../interfaces/profileInterface"
import { IUserRepository, IUserRequestDTO } from "../../interfaces/userInterface"

export class PostgresUserRepository implements IUserRepository {
  async findAllUser(): Promise<ResponseRepository> {
    const listUsers = await prisma.user.findMany()

    if (listUsers) {
      return {
        error: false,
        response: listUsers,
        status: 200
      }
    }

    throw {
      error: true,
      message: "Não foi possível retonar a lista de usuários!",
      status: 400
    }
  }

  async saveUser(user: User): Promise<ResponseRepository> {
    try {
      const userAlreadyExists = await prisma.user.findFirst({
        where: {
          email: user.email
        }
      })

      if (userAlreadyExists) {
        throw {
          error: true,
          message: "Já existe uma usuário cadastrado com esse email!",
          status: 401
        }
      }

      let newProfile = [
        { name: "Administrador", code: "1" },
        { name: "Usuário", code: "2" },
        { name: "Visitante", code: "3" }
      ]

      let profile: IProfileRequestDTO[] = await prisma.profile.findMany()

      if (profile.length <= 0) {
        for (let i = 0; i < newProfile.length; i++) {
          await prisma.profile.create({
            data: {
              role: newProfile[i].code,
              description: newProfile[i].name
            }
          })
        }
      }

      let role = String(user.id_profile)

      const profileUser = await prisma.profile.findFirst({ where: { role: role } })
      const newUser = await prisma.user.create({
        data: {
          id_user: user.id_user,
          email: user.email,
          name: user.name,
          password: user.password,
          profile: {
            connect: {
              id_profile: profileUser.id_profile
            }
          }
        }
      })

      if (newUser) {
        return {
          error: false,
          message: "Usuário criado com sucesso!",
          response: { user: newUser, profiles: await prisma.profile.findMany() },
          status: 201
        }
      }

      throw {
        error: true,
        message: "Não foi possível criar o usuário! tente novamente!",
        response: "",
        status: 400
      }
    } catch (error) {
      throw {
        error: true,
        status: 400,
        message: error
      }
    }
  }

  async updateUser(id_user: string, user: Omit<IUserRequestDTO, "id_user">): Promise<ResponseRepository> {
    const { email, name, id_profile, password } = user
    try {
      if (email) {
        const emailUserAlreadyExists = await prisma.user.findFirst({
          where: {
            email: email,
            NOT: {
              id_user: id_user
            }
          }
        })

        if (!emailUserAlreadyExists) {
          throw {
            error: true,
            message: `Já existe um usuário cadastrado com esse email ${email}!`,
            status: 401
          }
        }
      }

      const update = await prisma.user.updateMany({
        data: {
          email,
          name,
          id_profile,
          password
        },
        where: {
          id_user: id_user
        }
      })

      if (update.count > 0) {
        return {
          error: false,
          message: "Usuário Atualizado com Successo!",
          response: id_user,
          status: 200
        }
      }

      throw {
        error: true,
        message: "Não foi possível atualizar a usuário!",
        status: 400
      }
    } catch (error) {
      throw {
        error: true,
        status: 400,
        message: error
      }
    }
  }

  async removeUser(id_user: string): Promise<ResponseRepository> {
    try {
      const userRemove = await prisma.user.delete({
        where: {
          id_user: id_user
        }
      })

      if (userRemove) {
        return {
          error: false,
          message: "Usuário excluído com sucesso!",
          status: 200
        }
      }

      throw {
        error: true,
        message: "Não foi possível excluir o usuário!",
        status: 200
      }
    } catch (error) {
      throw {
        error: true,
        status: 400,
        message: error
      }
    }
  }

  async findUserByEmail(email: string): Promise<ResponseRepository<IUserRequestDTO>> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

      if (!user) {
        return {
          error: true,
          message: "Usuário não encontrado!",
          status: 400
        }
      }

      return {
        error: false,
        message: `Este email: ${email} está vinculadoao usuário: ${user.name}`,
        response: user,
        status: 200
      } as ResponseRepository<IUserRequestDTO>
    } catch (error) {
      throw {
        error: true,
        status: 400,
        message: error
      }
    }
  }

  async authLogin(email: string, password: string): Promise<ResponseRepository> {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        password: password
      }
    })

    if (!user) {
      throw {
        error: true,
        message: "Autorização negada!",
        status: 401
      }
    }

    return {
      error: false,
      message: "login Autorizado!",
      status: 200,
      response: user
    }
  }
}
