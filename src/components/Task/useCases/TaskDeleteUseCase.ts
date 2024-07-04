import { ITaskRepository } from "../../../repositories/interfaces/taskInterface"

export class TaskDeleteUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async removeTask(id_task: number) {
    if (!id_task)
      throw {
        error: true,
        message: "Id da tarefa é obrigatório!",
        status: 400
      }

    return await this.taskRepository.removeTask(id_task)
  }
}
