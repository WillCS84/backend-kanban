import { Request, Response, Router } from "express"
import { profileController } from "./components/Profiles"
import { userController } from "./components/Users"
import { authLoginController } from "./components/Auth"

const routes = Router()

routes.post("/login", authLoginController.authLogin)
routes.post("/", (req, res) => {
  res.status(200).json("Hello Word")
})

// routes on profile
routes.get("/profile", profileController.findAllProfile)
routes.post("/profile", profileController.create)
routes.put("/profile", profileController.update)
routes.delete("/profile", profileController.remove)

// routes on user
routes.get("/user", userController.findAllUser)
routes.post("/user", userController.createUser)
routes.put("/user", userController.updateUser)
routes.delete("/user", userController.removeUser)

export { routes }
