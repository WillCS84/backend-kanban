import { PostgresTaskRepository } from "../../repositories/implementations/Task/postgresTaskRepository"
import { TaskController } from "./controllers/TaskController"
import { TaskCreateUseCase } from "./useCases/TaskCreateUseCase"
import { TasksFindAllUseCases } from "./useCases/TaskFindAllUseCase"

const postgresTaskRepository = new PostgresTaskRepository()

const taskCreateUseCase = new TaskCreateUseCase(postgresTaskRepository)
const taskFindAllUseCase = new TasksFindAllUseCases(postgresTaskRepository)

const taskController = new TaskController(taskCreateUseCase, taskFindAllUseCase)

export { taskController }
