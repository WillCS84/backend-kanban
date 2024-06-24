import { Request, Response } from "express"
import { AuthLoginUseCase } from "../useCases/AuthLoginUseCase"

export class AuthLoginController {
  constructor(private authLoginController: AuthLoginUseCase) {}

  authLogin = async (request: Request, response: Response) => {
    const { email, password } = request.body
    try {
      const user = await this.authLoginController.login(email, password)

      return response.status(user.status).json({ error: user.error, message: user.message, response: user.response })
    } catch (error) {
      return response.status(error.status).json({ error: error.error, message: error.message })
    }
  }
}
