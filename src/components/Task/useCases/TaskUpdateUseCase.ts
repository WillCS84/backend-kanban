import { ITaskRepository, ITaskRequestDTO } from "../../../repositories/interfaces/taskInterface"

export class TaskUpdateUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async update(id_task: number, data: ITaskRequestDTO) {
    const { description, status, title } = data

    if (!id_task) {
      throw {
        error: true,
        message: "Id da tarefa é Obrigatório!",
        status: 400
      }
    }

    if ((!status && !description && !title) || (status === 0 && description === " " && title === " ")) {
      throw {
        error: true,
        message: `Nenhum item encontrado para atualização!`,
        status: 401
      }
    }
    return await this.taskRepository.updateTask(id_task, data)
  }
}
