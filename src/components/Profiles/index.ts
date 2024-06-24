import { PostgresProfileRepository } from "../../repositories/implementations/Profile/postgresProfileRepository"
import { ProfileController } from "./controllers/ProfileController"
import { ProfileCreateUseCase } from "./useCases/ProfileCreateUseCases"

import { ListAllProfilesUseCases } from "./useCases/ProfileFindAllUseCase"
import { ProfileFindByDescription } from "./useCases/ProfileFindByDescriptionUseCase"
import { ProfileRemoveUseCase } from "./useCases/ProfileRemoveUseCase"
import { ProfileUpdateUseCase } from "./useCases/ProfileUpdateUseCase"

const postgresProfileRepository = new PostgresProfileRepository()

const profileFindAllUseCase = new ListAllProfilesUseCases(postgresProfileRepository)
const profileFindByDescriptionUseCase = new ProfileFindByDescription(postgresProfileRepository)
const profileCreateUseCase = new ProfileCreateUseCase(postgresProfileRepository, profileFindByDescriptionUseCase)
const profileUpdateController = new ProfileUpdateUseCase(postgresProfileRepository, profileFindByDescriptionUseCase)
const profileRemoveController = new ProfileRemoveUseCase(postgresProfileRepository)

const profileController = new ProfileController(
  profileFindAllUseCase,
  profileCreateUseCase,
  profileUpdateController,
  profileRemoveController
)

export { profileController }
