import { Request, Response } from "express"
import { ListAllProfilesUseCases } from "../useCases/ProfileFindAllUseCase"
import { ProfileCreateUseCase } from "../useCases/ProfileCreateUseCases"
import { ProfileUpdateUseCase } from "../useCases/ProfileUpdateUseCase"
import { ProfileRemoveUseCase } from "../useCases/ProfileRemoveUseCase"

export class ProfileController {
  constructor(
    private profileFindAllController: ListAllProfilesUseCases,
    private profileCreateController: ProfileCreateUseCase,
    private profileUpdateController: ProfileUpdateUseCase,
    private profileRemoveController: ProfileRemoveUseCase
  ) {}

  findAllProfile = async (request: Request, response: Response) => {
    try {
      const listProfiles = await this.profileFindAllController.findAll()

      return response.status(listProfiles.status).json({ error: listProfiles.error, profiles: listProfiles.response })
    } catch (error) {
      return response.status(error?.status || 400).json({ error: true, message: error?.message || "prisma" })
    }
  }

  create = async (request: Request, response: Response) => {
    const { description, role } = request.body

    try {
      const newProfile = await this.profileCreateController.createProfile({ description, role })

      if (newProfile)
        return response.status(newProfile.status).json({ error: newProfile.error, profile: newProfile.response })

      return response.status(400).json({ error: true, message: "Não foi posível criar o perfil!" })
    } catch (error) {
      return response.status(error.status).json({ error: error.error, message: error.message })
    }
  }

  update = async (request: Request, response: Response) => {
    const { id_profile, description, role } = request.body
    const body = { description, role }

    try {
      const profile = await this.profileUpdateController.updateProfile(id_profile, body)
      return response.status(profile.status).json({ error: profile.error, message: profile.message })
    } catch (error) {
      return response.status(error.status).json({ error: error.error, message: error.message })
    }
  }

  remove = async (request: Request, response: Response) => {
    const { id_profile } = request.body
    try {
      const profile = await this.profileRemoveController.removeProfile(id_profile)

      return response.status(profile.status).json({ error: profile.error, message: profile.message })
    } catch (error) {
      return response.status(error.status).json({ error: error.error, message: error.message })
    }
  }
}
