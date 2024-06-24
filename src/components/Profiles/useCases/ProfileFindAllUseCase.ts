import { Response } from "express"
import { IProfileRepository } from "../../../repositories/interfaces/profileInterface"

export class ListAllProfilesUseCases {
  constructor(private profileRepository: IProfileRepository) {}

  async findAll() {
    return await this.profileRepository.findAllProfile()
  }
}
