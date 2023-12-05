export interface CreateUserPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface createJWTTokenPayload {
  email: string
  password: string
}
