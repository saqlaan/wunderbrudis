export const getLogin = (state: any) => state.login

export const getIsLoginLoading = (state: any) => getLogin(state).loading
export const getIsLoginError = (state: any) => getLogin(state).error
export const getLoginErrorObj = (state: any) => getLogin(state).errorObj
