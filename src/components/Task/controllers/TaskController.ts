import { Request, Response } from "express"
import { TaskCreateUseCase } from "../useCases/TaskCreateUseCase"
import { TasksFindAllUseCases } from "../useCases/TaskFindAllUseCase"
import { TaskUpdateUseCase } from "../useCases/TaskUpdateUseCase"
import { TaskDeleteUseCase } from "../useCases/TaskDeleteUseCase"

export class TaskController {
  constructor(
    private taskCreateController: TaskCreateUseCase,
    private taskFindAllController: TasksFindAllUseCases,
    private taskUpdateController: TaskUpdateUseCase,
    private taskRemoveController: TaskDeleteUseCase
  ) {}

  createTask = async (request: Request, response: Response) => {
    const { title, description, status } = request.body

    try {
      const newTask = await this.taskCreateController.createTask({ title, description, status })

      if (newTask) return response.status(newTask.status).json({ error: newTask.error, task: newTask.response })

      return response.status(400).json({ error: true, message: "Não foi posível criar a tarefa!" })
    } catch (error) {
      return response.status(error.status).json({ error: error.error, message: error.message })
    }
  }

  findAllTask = async (request: Request, response: Response) => {
    try {
      const listTasks = await this.taskFindAllController.findAll()

      return response.status(listTasks.status).json({ error: listTasks.error, tasks: listTasks.response })
    } catch (error) {
      return response.status(error?.status || 400).json({ error: true, message: error?.message || "prisma" })
    }
  }

  updateTask = async (request: Request, response: Response) => {
    const { id_task, description, title, status } = request.body
    const body = { description, title, status }

    try {
      const task = await this.taskUpdateController.update(id_task, body)
      return response.status(task.status).json({ error: task.error, message: task.message })
    } catch (error) {
      return response.status(error?.status || 400).json({ error: true, message: error?.message || "prisma" })
    }
  }

  deleteTask = async (request: Request, response: Response) => {
    const { id_task } = request.body
    try {
      const task = await this.taskRemoveController.removeTask(id_task)

      return response.status(task.status).json({ error: task.error, message: task.message })
    } catch (error) {
      return response.status(error.status).json({ error: error.error, message: error.message })
    }
  }
}
