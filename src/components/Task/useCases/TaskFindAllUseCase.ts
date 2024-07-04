import { ITaskRepository } from "../../../repositories/interfaces/taskInterface"

export class TasksFindAllUseCases {
  constructor(private taskRepository: ITaskRepository) {}

  async findAll() {
    return await this.taskRepository.findAll()
  }
}
