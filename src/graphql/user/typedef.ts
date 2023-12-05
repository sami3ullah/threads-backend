export const typeDefs = `#graphql

type CreatedUser{
  code: Int
  success: Boolean
  message: String
  user: CreateUserPayload
}

type CreateUserPayload{
  firstName: String
  lastName: String
  email: String
  password: String
}

extend type CreateUserPayload{
  id: ID
}

type generateTokenResponse {
  code: Int
  success: Boolean
  message: String
  token: String
  user: UserWithoutPassword
}

type UserWithoutPassword{
  id: ID
  firstName: String
  lastName: String
  email: String
}

`