export const emptyActionCreator = (type: string) => () => ({type})
export const dataActionCreator = (type: string) => (data: any) => ({type, data})
