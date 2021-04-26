import app from "./api/app"
import dotenv from "dotenv"

dotenv.config()
const port = process.env.PORT || 8080

export const server = app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
