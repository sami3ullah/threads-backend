import UserService from "../../services/user"
import { CreateUserPayload } from "../../types/user.interface"

const queries = {}
const mutations = {
  createUser: async (_:any, payload:CreateUserPayload) => {
      const user = await UserService.createUser(payload)
      // removing salt from the user
      const {salt, ...userWithoutSalt} = user
      // return user.id
      return {
          code: 201,
          success: true,
          message: "User Created Successfully",
          user: userWithoutSalt
      }
  }
}

export const resolvers = {queries, mutations}