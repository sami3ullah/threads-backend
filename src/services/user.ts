import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import { prismaClient } from "../lib/db"
import { CreateUserPayload, createJWTTokenPayload } from "../types/user.interface"
import { emailRegex, passwordRegex } from "../utils/const/general"
import { throwGraphqlError } from "../utils/functions/functions"
import { StatusCodeErrors } from "../utils/enum"

class UserService {
  private static jwtSecret = process.env.JWT_SECRET || "aegen@f/sfe32e2fsfg.cxsdw"
  // ================= this function checked if an email exist in the db =================
  private static async getUserByEmail(email: string) {

    try{
      const user = await prismaClient.user.findUnique({
        where: {email: email}
      })
  
      if(user) return user
      return ""
    }catch(err){
      throwGraphqlError(StatusCodeErrors.INTERNAL_SERVER_ERROR, false, (err as Error)?.message)
      return
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
      throwGraphqlError(StatusCodeErrors.NOT_VALID, false, "email is not valid")
      return
    }

    // if password is not valid
    if(!isPasswordValid) {
      throwGraphqlError(StatusCodeErrors.NOT_VALID, false, "password is not as per policy")
      return
    }

    // check if an email already exist in the db
    const emailExist = await UserService.getUserByEmail(email)
    if(emailExist) {
      throwGraphqlError(409, false, "email already exist")
      return
    }

    // random salt with 12 saltRounds
    const hashedPassword = bcrypt.hashSync(password, 12)

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword
      }
    })
  }

  // ====================== Generating JWT Token =====================
  public static async generateUserToken(payload: createJWTTokenPayload) {
    const {email, password} = payload 

    const user = await UserService.getUserByEmail(email)

    if(!user){
      throwGraphqlError(StatusCodeErrors.NOT_FOUND, false, "cannot find an account with this email and password")
      return
    }

    // matching entered and stored password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if(!isPasswordCorrect) {
      throwGraphqlError(StatusCodeErrors.NOT_FOUND, false, "cannot find an account with this email and password")
      return;
    }
    // generate jwt token
    const token = JWT.sign({id: user.id, email: user.email}, UserService.jwtSecret)
    const {password:userPassword, ...restUser} = user

    return {
      code: 200,
      success: true,
      message: "login successful",
      token,
      user: restUser
    }
  }

}

export default UserService