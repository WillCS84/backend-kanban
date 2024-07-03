import { Request, Response } from "express"
import { TaskCreateUseCase } from "../useCases/TaskCreateUseCase"
import { TasksFindAllUseCases } from "../useCases/TaskFindAllUseCase"

export class TaskController {
  constructor(private taskCreateController: TaskCreateUseCase, private taskFindAllController: TasksFindAllUseCases) {}

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
}
