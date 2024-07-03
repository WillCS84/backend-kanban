import { ResponseRepository } from "../../Utils/interfaces"
import { Task } from "../../entities/Task/Task"

export interface ITaskRequestDTO {
  id_task?: number
  title: string
  description: string
  status: number
}

export interface ITaskRepository {
  saveTask(task: Task): Promise<ResponseRepository>
  findAll(): Promise<ResponseRepository>
}
