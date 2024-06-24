import { PostgresUserRepository } from "../../repositories/implementations/User/postgresUserRepository"
import { UserController } from "./controllers/UserController"
import { CreateUserUseCase } from "./useCases/UserCreateUseCase"
import { FindAllUserUseCase } from "./useCases/UserFindAllUseCase"
import { FindUserByEmailUseCase } from "./useCases/UserFindByEmailUseCase"
import { RemoveUserUseCase } from "./useCases/UserRemoveUseCase"
import { UpdateUserUseCase } from "./useCases/UserUpdateUseCase"

const postgresUserRepository = new PostgresUserRepository()

const findAllUserUseCase = new FindAllUserUseCase(postgresUserRepository)
const updateUserUseCase = new UpdateUserUseCase(postgresUserRepository)
const findUserByEmail = new FindUserByEmailUseCase(postgresUserRepository)
const createUserUseCase = new CreateUserUseCase(postgresUserRepository, findUserByEmail)
const removeUserUseCAse = new RemoveUserUseCase(postgresUserRepository)

const userController = new UserController(
  findAllUserUseCase,
  updateUserUseCase,
  createUserUseCase,
  removeUserUseCAse,
  findUserByEmail
)

export { userController }
