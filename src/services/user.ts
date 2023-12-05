import { createHmac, randomBytes } from "crypto"
import { prismaClient } from "../lib/db"
import { CreateUserPayload } from "../types/user.interface"
import { emailRegex, passwordRegex } from "../utils/const/general"
import { GraphQLError } from "graphql"
class UserService {

  // ================= this function checked if an email exist in the db =================
  public static async isEmailExist(email: string) {

    try{
      const user = await prismaClient.user.findFirst({
        where: {email: email}
      })
  
      if(user) return true
      return false
    
    }catch(err){
      throw new GraphQLError((err as Error)?.message, {
        extensions: {
          code: 500,
          success: "false",
          message: (err as Error)?.message    
        }
      })
    }
  }
  
  // ======================== this fn is responsible for creating the user ============================
  public static async createUser(payload: CreateUserPayload) {
    const {firstName, lastName, email, password} = payload
    
    // check for valid email
    const isEmailValid = emailRegex.test(email)
    const isPasswordValid = passwordRegex.test(password)
    
    // if email is not valid 
    if(!isEmailValid) {
      throw new GraphQLError("Email is not valid", {
        extensions: {
          code: 422,
          success: false,
          message: "Email is not valid",
        }
      })
    }

    // if password is not valid
    if(!isPasswordValid){
      throw new GraphQLError("Password is not as per policy", {
        extensions:{
          code: 422,
          success: false,
          message: "Password is not as per policy"
          
        }
      })
    }

    // check if an email already exist in the db
    const emailExist = await UserService.isEmailExist(email)
    if(emailExist){
      throw new GraphQLError("Email Already Exist", {
        extensions:{
          code: 409,
          success: false,
          message: "Email Already Exist"
          
        }
      })
    }

    // random salt
    const salt = randomBytes(256).toString('hex')
    const hashedPassword  = createHmac("sha256", salt).update(password).digest('hex')
    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt
      }
    })
  }

}

export default UserService