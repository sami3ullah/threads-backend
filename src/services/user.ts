import { createHmac, randomBytes } from "crypto"
import { prismaClient } from "../lib/db"
import { CreateUserPayload } from "../types/user.interface"
import { emailRegex, passwordRegex } from "../utils/const/general"
class UserService {
  
  public static createUser(payload: CreateUserPayload) {
    const {firstName, lastName, email, password} = payload
    
    // check for valid email
    const isEmailValid = emailRegex.test(email)
    const isPasswordValid = passwordRegex.test(password)
    
    // if email is not valid 
    if(!isEmailValid) {
      throw new Error("Email is not valid")
    }

    // if password is not valid
    if(!isPasswordValid){
      throw new Error("Password is not valid, password needs to have atleast 1 uppercase character + 1 special character + 1 number ")
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