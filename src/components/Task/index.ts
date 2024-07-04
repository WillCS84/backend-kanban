import { PostgresTaskRepository } from "../../repositories/implementations/Task/postgresTaskRepository"
import { TaskController } from "./controllers/TaskController"
import { TaskCreateUseCase } from "./useCases/TaskCreateUseCase"
import { TaskDeleteUseCase } from "./useCases/TaskDeleteUseCase"
import { TasksFindAllUseCases } from "./useCases/TaskFindAllUseCase"
import { TaskUpdateUseCase } from "./useCases/TaskUpdateUseCase"

const postgresTaskRepository = new PostgresTaskRepository()

const taskCreateUseCase = new TaskCreateUseCase(postgresTaskRepository)
const taskFindAllUseCase = new TasksFindAllUseCases(postgresTaskRepository)
const taskUpdateUseCase = new TaskUpdateUseCase(postgresTaskRepository)
const taskRemoveUseCase = new TaskDeleteUseCase(postgresTaskRepository)

const taskController = new TaskController(taskCreateUseCase, taskFindAllUseCase, taskUpdateUseCase, taskRemoveUseCase)

export { taskController }
