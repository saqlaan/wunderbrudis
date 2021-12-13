import { mapServerError } from "../../utils/functions"

export const getRegister = (state: any) => state.register

export const getEmail = (state: any) => getRegister(state).email
export const getIsSignupLoading = (state: any) => getRegister(state).isLoading
export const getIsSignupError = (state: any) => getRegister(state).error
export const getSignupErrorObj = (state: any) => getRegister(state).errorObj
export const getIsUserCreated = (state: any) => getRegister(state).created
export const getSignUpServerErrorList = (state: any) => {
  const isError = getIsSignupError(state)
  if(!isError) return []
  return mapServerError(getSignupErrorObj(state))
}
