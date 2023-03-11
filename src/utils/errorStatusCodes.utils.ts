const ErrorStatusCodes = {
    NotFoundException: 404,
    DuplicateEntryException: 409,
    InternalServerException: 500,
    UnauthorizedException: 401,
    UnexpectedException: 404,
    CreateFailedException: 500,
    UpdateFailedException: 500,
    DeleteFailedException: 500,
    ConnectionFailedException: 500,
    InvalidEndpointException: 404,
    ForeignKeyViolationException: 512,
};

export default ErrorStatusCodes;
