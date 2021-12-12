export const getAuth = (state: any) => state.auth

export const getToken = (state: any) => getAuth(state).token
export const getIsUserAuthenticated = (state: any) => getAuth(state).token? true : false