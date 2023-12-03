import express from "express"
import { ApolloServer } from "@apollo/server"
import {expressMiddleware} from "@apollo/server/express4"

const init = async () => {
  const app = express()
  const PORT = Number(process.env.PORT) || 8000

  // middlewares
  app.use(express.json())

  // creating graphql server here
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name: String): String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hey there, I am a graphql server",
        say: (_, {name}: {name: string}) => `Hello ${name} world`
      }
    }
  })

  await gqlServer.start()

  app.get("/", (req, res) => {
    res.json({message: "server is running"})
  })

  // graphql server expose
  app.use("/graphql", expressMiddleware(gqlServer))
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
  })
}

// fn call
init()