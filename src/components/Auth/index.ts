import { PostgresUserRepository } from "../../repositories/implementations/User/postgresUserRepository"
import { AuthLoginController } from "./controllers/AuthLoginController"
import { AuthLoginUseCase } from "./useCases/AuthLoginUseCase"

const postgresUserRepository = new PostgresUserRepository()

const authLoginUseCase = new AuthLoginUseCase(postgresUserRepository)

const authLoginController = new AuthLoginController(authLoginUseCase)

export { authLoginController }
