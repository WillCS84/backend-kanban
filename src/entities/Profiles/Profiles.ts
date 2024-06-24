import { IProfileRequestDTO } from "../../repositories/interfaces/profileInterface"

export class Profile {
  public readonly id_profile: number
  public description: string
  public role: string

  constructor(props: IProfileRequestDTO) {
    Object.assign(this, props)
  }
}
