const getErrorResponse = (res, statusCode, errorMessage) => {
    return res.status(statusCode).json({ error: errorMessage });
};

export const badRequestError = (res, errorMessage) => {
    return getErrorResponse(res, 400, errorMessage);
};

export const notFoundError = (res, errorMessage) => {
    return getErrorResponse(res, 404, errorMessage);
};

export const internalServerError = (res, errorMessage) => {
   return getErrorResponse(res, 500, errorMessage);
};