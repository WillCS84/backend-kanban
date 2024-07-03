import { ITaskRequestDTO } from "../../repositories/interfaces/taskInterface"

export class Task {
  public readonly id_task: number

  public title: string
  public description: string
  public status: number

  constructor(props: ITaskRequestDTO) {
    Object.assign(this, props)
  }
}
