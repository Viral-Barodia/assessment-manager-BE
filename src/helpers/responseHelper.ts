export const ResponseHelper = (hasError: boolean, data: any, message: string) => {
    return {
        hasError: hasError,
        data: data,
        message: message
    }
}