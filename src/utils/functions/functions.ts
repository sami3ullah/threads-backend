import { GraphQLError } from "graphql";

export const throwGraphqlError = (statusCode: number, success: boolean, message: string) => {
  
  throw new GraphQLError(message, {
    extensions: {
      code: statusCode,
      success,
      message
    }
  })
  return;
}