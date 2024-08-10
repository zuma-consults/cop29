const { BodyResponder } = require("./core");

const errorHandler = (res, message, statusCode) => {
    res.status(statusCode || 500).json(BodyResponder(false, message));
    // throw Error(`${message}, Error status: ${statusCode}`);
};

const systemError = (res, data) =>{
    res.status(500).json(BodyResponder(false, "Something went wrong", data));
};

module.exports = {
    errorHandler,
    systemError
}