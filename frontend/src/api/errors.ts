export class ApiError extends Error {
    readonly status: number;
    constructor(message: string, status: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

export class NetworkError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
        this.name = 'NetworkError'
    }
}