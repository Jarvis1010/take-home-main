import { recipeMiddleware, searchMiddleware } from "./routes"

import bodyParser from "body-parser"
import { createAndConnectToServer } from "./db"
import express from "express"
import http from "http"

const appStartup = async (): Promise<void> => {
  await createAndConnectToServer()
  const app = express()
  // add parsers for the body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  // create our routes
  app.get("/api/recipe/:id", recipeMiddleware)
  app.post("/api/search", searchMiddleware)
  // create a server
  const httpServer = new http.Server(app)
  httpServer.listen(4000, "0.0.0.0", () => {
    console.log("now running on 4000")
  })
}

appStartup()
