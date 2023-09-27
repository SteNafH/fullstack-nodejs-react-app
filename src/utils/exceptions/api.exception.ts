import Config from '../../configs/config.js';
import ErrorStatusCodes from '../errorStatusCodes.utils.js';

class ApiException extends Error {
    public name: string;
    private status: number;
    private data?: string;
    private error: string;

    constructor(message: string, data?: string, status = 401) {
        super(message);
        if (Config.NODE_ENV === "dev")
            this.message = "Api Error: " + message;
        else
            this.message = message;

        this.name = "API Error";
        this.error = this.constructor.name;
        this.status = status;
        this.data = data;
    }
}

export class InternalServerException extends ApiException {
    constructor (message: string, data?: string){
        super(message, data, ErrorStatusCodes.InternalServerException);
    }
}
