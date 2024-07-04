import fs from "fs"
import path from "path"

const env = process.env.NODE_ENV || "development"
const envFile = path.resolve(__dirname, `.env.${env}`)
const defaultEnvFile = path.resolve(__dirname, ".env")

if (fs.existsSync(envFile)) {
  fs.copyFileSync(envFile, defaultEnvFile)
  console.log(`Copied ${envFile} to ${defaultEnvFile}`)
} else {
  console.error(`No environment file found for NODE_ENV=${env}`)
  process.exit(1)
}
