export default class RequestError extends Error {
    constructor(statusCode, payload) {
        super(payload === null || payload === void 0 ? void 0 : payload.errors.message);
        this.statusCode = undefined;
        this.payload = undefined;
        this.name = 'RequestError';
        this.payload = payload;
        this.statusCode = statusCode;
    }
}
