import { Task } from "../../../entities/Task/Task"
import { ITaskRepository, ITaskRequestDTO } from "../../../repositories/interfaces/taskInterface"

export class TaskCreateUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async createTask(task: ITaskRequestDTO) {
    this.validateTask(task)

    const newTask = new Task(task)

    return await this.taskRepository.saveTask(newTask)
  }

  private validateTask = async (data: ITaskRequestDTO) => {
    const { description, status, title } = data

    let message = undefined

    if (!description || description === " ") message = "Não foi possível localizar a descrição da tarefa!"
    if (!status) message = "Não foi possível localizar o status da tarefa!"
    if (!title || title === " ") message = "Não foi possível localizar o título da tarefa!"

    if (message) {
      throw {
        error: true,
        message: message,
        status: 400
      }
    }
  }
}
