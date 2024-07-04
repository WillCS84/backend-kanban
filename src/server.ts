import express from "express"
import cors from "cors"
import { routes } from "./routes"

require("dotenv").config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env.production"
})

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json({ limit: "50000000000mb" }))
app.use(routes)

app.listen(PORT, () => console.log(`HTTP Server is running on port ${PORT}🔥`))
