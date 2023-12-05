import { ApolloServer } from "@apollo/server"
import { User } from "./user"

const createApolloGraphqlServer = async () => {
  const gqlServer = new ApolloServer({
    typeDefs: `
      ${User.typeDefs}
      type Query {
        ${User.queries}
      }
      type Mutation {
        ${User.mutation}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries
      },
      Mutation: {
        ...User.resolvers.mutations
      }
    },
  })

  await gqlServer.start()
  
  return gqlServer
}

export default createApolloGraphqlServer