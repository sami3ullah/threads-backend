import UserService from "../../services/user"
import { CreateUserPayload, createJWTTokenPayload } from "../../types/user.interface"

const queries = {
  getUserToken: async(_:any, payload: createJWTTokenPayload) => {
    const data = await UserService.generateUserToken(payload)
    return data
  }
}
const mutations = {
  createUser: async (_:any, payload:CreateUserPayload) => {
      const user = await UserService.createUser(payload)

      return {
          code: 201,
          success: true,
          message: "User Created Successfully",
          user: user
      }
  }
}

export const resolvers = {queries, mutations}