/**
 *
 * @param {boolean} status
 * @param {string} message
 * @param {response json || object} data
 * @returns object response data;
 */
function BodyResponder(status, message, data) {
    return {
        status,
        message,
        data
    }
};

const successHandler = (res, message, data) =>{
    res.status(200).json(BodyResponder(true, message, data));
}

module.exports = {
    BodyResponder,
    successHandler
}