import Config from '../../configs/config.js';
import ErrorStatusCodes from '../errorStatusCodes.utils.js';

class DatabaseException extends Error {
    public name: string;
    private status: number;
    private data?: string;
    private error: string;

    constructor(message: string, data?: string, status = 404) {
        super(message);
        if (Config.NODE_ENV === "dev")
            this.message = "Database Error: " + message;
        else
            this.message = message;

        this.name = "Database Error";
        this.error = this.constructor.name;
        this.status = status;
        this.data = data;
    }
}

export class ConnectionFailedException extends DatabaseException {
    constructor (message: string, data?: string){
        super(message, data, ErrorStatusCodes.ConnectionFailedException);
    }
}
