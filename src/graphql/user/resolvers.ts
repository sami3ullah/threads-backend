import UserService from "../../services/user"
import { CreateUserPayload } from "../../types/user.interface"

const queries = {}
const mutations = {
  createUser: async (_:any, payload:CreateUserPayload) => {
    try{
      const user = await UserService.createUser(payload)
      return user.id
    }catch(err){
      return (err as Error)?.message
    }
  }
}

export const resolvers = {queries, mutations}