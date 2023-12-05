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

`