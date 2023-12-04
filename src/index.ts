import express from "express"
import {expressMiddleware} from "@apollo/server/express4"
import createApolloGraphqlServer from "./graphql"

const init = async () => {
  const app = express()
  const PORT = Number(process.env.PORT) || 8000

  // middlewares
  app.use(express.json())

  app.get("/", (req, res) => {
    res.json({message: "server is running"})
  })

  // graphql server middleware exposing
  const gqlServer = await createApolloGraphqlServer()
  app.use("/graphql", expressMiddleware(gqlServer))

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
  })
}

// fn call
init()