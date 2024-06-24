import { Response } from "express"
import { Profile } from "../../entities/Profiles/Profiles"
import { ResponseRepository } from "../../Utils/interfaces"

export interface IProfileRequestDTO {
  id_profile?: number
  description: string
  role: string
}

export interface IProfileRepository {
  saveProfile(profile: Profile): Promise<ResponseRepository>
  updateProfile(id_profile: number, profile: IProfileRequestDTO): Promise<ResponseRepository>
  findAllProfile(): Promise<ResponseRepository>
  removeProfile(id_profile: number): Promise<ResponseRepository>
  findByDescription(description: string): Promise<ResponseRepository>
}
