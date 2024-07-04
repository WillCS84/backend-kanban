import { prisma } from "../../../database"
import { Task } from "../../../entities/Task/Task"
import { ResponseRepository } from "../../../Utils/interfaces"
import { ITaskRepository, ITaskRequestDTO } from "../../interfaces/taskInterface"

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

  async removeTask(id_task: number): Promise<ResponseRepository> {
    try {
      if (!id_task)
        throw {
          error: true,
          message: "Id da tarefa é obrigatório",
          status: 400
        }

      const task = await prisma.task.delete({
        where: {
          id_task: id_task
        }
      })

      if (task) {
        return {
          error: false,
          message: "Tarefa removida com sucesso!",
          status: 200
        }
      }

      throw {
        error: true,
        message: "Não foi possível remover a tarefa!",
        status: 400
      }
    } catch (error) {
      throw {
        error: true,
        message: error,
        status: 400
      }
    }
  }

  async updateTask(id_task: number, fields: ITaskRequestDTO): Promise<ResponseRepository> {
    try {
      if (!id_task)
        throw {
          error: true,
          message: "Id da tarefa é obrigatório",
          status: 400
        }

      const { description, status, title } = fields

      const update = await prisma.task.updateMany({
        where: {
          id_task: id_task
        },
        data: {
          description,
          status,
          title
        }
      })

      if (update.count > 0) {
        return {
          error: false,
          message: "Tarefa Atualizada com sucesso!",
          status: 200
        }
      }

      throw {
        error: true,
        message: "Não foi possível atualizar a tarefa!",
        status: 400
      }
    } catch (error) {
      throw {
        error: true,
        message: error,
        status: 400
      }
    }
  }
}
