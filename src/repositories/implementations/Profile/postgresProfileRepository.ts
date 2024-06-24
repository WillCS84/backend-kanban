import { Response } from "express"
import { ResponseRepository } from "../../../Utils/interfaces"
import { prisma } from "../../../database"
import { Profile } from "../../../entities/Profiles/Profiles"
import { IProfileRepository, IProfileRequestDTO } from "../../interfaces/profileInterface"

export class PostgresProfileRepository implements IProfileRepository {
  async findAllProfile(): Promise<ResponseRepository> {
    const listProfiles = await prisma.profile.findMany()

    if (listProfiles) {
      return { error: false, response: listProfiles, status: 200 }
    }

    throw {
      error: true,
      message: "Não foi possivel carregar a lista de perfis!",
      status: 400
    }
  }

  async saveProfile(profile: Profile): Promise<ResponseRepository> {
    try {
      const { description, role } = profile

      const newProfile = await prisma.profile.create({
        data: { description: description, role: role }
      })

      if (newProfile) {
        return { error: false, response: newProfile, status: 201 }
      }

      throw {
        error: true,
        message: "Não foi possível criar o perfil! tente novamente!",
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

  async updateProfile(id_profile: number, profile: IProfileRequestDTO): Promise<ResponseRepository> {
    const { description, role } = profile
    try {
      const update = await prisma.profile.updateMany({
        data: {
          description,
          role
        },
        where: {
          id_profile: id_profile
        }
      })

      if (update.count > 0) {
        return {
          error: false,
          message: "Perfil Atualizado com sucesso",
          status: 200
        }
      }

      throw {
        error: true,
        message: "Não foi possível atualizar o perfil!",
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

  async removeProfile(id_profile: number): Promise<ResponseRepository> {
    try {
      const user = await prisma.user.findMany({
        where: {
          id_profile: id_profile
        }
      })

      if (user) {
        throw {
          error: true,
          message: "Existem usuário(s) vinculados a estes perfil!",
          status: 400
        }
      }

      const profile = await prisma.profile.findFirst({
        where: {
          id_profile: id_profile
        }
      })

      if (!profile) {
        throw {
          error: true,
          message: "Perfil não encontrado para esse Id!",
          status: 400
        }
      }

      const profileRemove = await prisma.profile.delete({
        where: {
          id_profile: id_profile
        }
      })

      if (profileRemove) {
        return {
          error: false,
          message: "Perfil removido com sucesso!",
          status: 200
        }
      }

      throw {
        error: true,
        message: "Não foi possível excluir o perfil!",
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

  async findByDescription(description: string): Promise<ResponseRepository> {
    try {
      const profile = await prisma.profile.findFirst({
        where: {
          description: {
            contains: description,
            mode: "insensitive"
          }
        }
      })

      if (profile) {
        return {
          error: false,
          response: profile,
          status: 200
        }
      }

      return {
        error: true,
        message: `Não foi possível localizar o perfil com essa descrição: ${description}`,
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
}
