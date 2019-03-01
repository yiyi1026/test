import express from "express"
import {routes} from "./routes";

const path = require("path")
const app = express()
const port: Number = 3001

app.set("views", path.join(__dirname, "views"))
app.use(express.json());
app.use('/', routes);
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`app listening on port ${port}`))
