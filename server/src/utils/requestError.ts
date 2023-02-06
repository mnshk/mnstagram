interface IRequestErrorPayload {
    [key: string]: {
        [key: string]: string
    }
}

export default class RequestError extends Error {

    statusCode: number | undefined = undefined
    payload: unknown = undefined

    constructor(statusCode?: number, payload?: IRequestErrorPayload) {
        super(payload?.errors.message)
        this.name = 'RequestError'
        this.payload = payload
        this.statusCode = statusCode
    }
}