export const globalErrHandler = (err, req, res, next) => {      //Everytime when this is called we are exiting the app
    //Stack
    //message
    const stack = err?.stack;           //If err is not null or undefined, then get err.stack
    const statusCode = err?.statusCode ? err?.statusCode : 500;         //If error is something else then 500 so use this
    const message = err?.message;           //err.stack gives you the stack trace — a detailed snapshot of where the error happened

    res.status(statusCode).json ({
        stack,
        message
    });
}

//404 handler
export const notFound = (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    next(err);
}