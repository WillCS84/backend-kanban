import { prisma } from "../../../database"
import { Task } from "../../../entities/Task/Task"
import { ResponseRepository } from "../../../Utils/interfaces"
import { ITaskRepository } from "../../interfaces/taskInterface"

export class PostgresTaskRepository implements ITaskRepository {
  async saveTask(task: Task): Promise<ResponseRepository> {
    try {
      const { title, description, status } = task
      const newTask = await prisma.task.create({
        data: { title: title, description: description, status: status }
      })

      if (newTask) {
        return { error: false, response: newTask, status: 201 }
      }

      throw {
        error: true,
        message: "Não foi possível criar a tarefa! tente novamente!",
        status: 400
      }
    } catch (error) {
      throw {
        error: true,
        status: 400,
        message: error
      }
    }
  }

  async findAll(): Promise<ResponseRepository> {
    const listTasks = await prisma.task.findMany()

    if (listTasks) {
      return { error: false, response: listTasks, status: 200 }
    }

    throw {
      error: true,
      message: "Não foi possivel carregar a lista de tarefas!",
      status: 400
    }
  }
}
