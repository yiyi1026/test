import express from "express"
import { routes } from "./routes"

const app = express()
const port: Number = 3001

app.all('/*', function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})

app.use(express.json())
app.use('/', routes)

app.listen(port, () => console.log(`app listening on port ${port}`))
