export const mapServerError: any = (serverError: any) => {
  const errorsList = []
  if(serverError.errors) {
    Object.values(serverError.errors).
      forEach((errors: any) => errorsList.push(...errors))
  }else if(serverError.message){
      errorsList.push(serverError.message)
  }else{
    errorsList.push('Error! Something went wrong')
  }
  return errorsList
}