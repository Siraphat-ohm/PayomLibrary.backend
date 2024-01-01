import { HttpStatus } from './HttpStatusCode';
import BaseError from './BaseError';
import { ValidationError } from 'express-validator';

export class ApiError extends BaseError {
    public readonly errors?: ValidationError[];

    constructor (
        name: string,
        httpCode = HttpStatus.INTERNAL_SERVER_ERROR,
        description = "Internal Server Error",
        errors?: ValidationError[]
    ) {
        super( name, httpCode, description );
        this.errors = errors;
    }
}