const {status} = require('./../Constant');

module.exports.handleErrorResquest = async(err, req, res, next ) => {
    let _status = null;
    let _message = '';
    if(err) {
        _status = err.casue || status.INTERNAL_ERROR;
        _message = err.length > 0 ? "Something happend on your sever!" : err.message;
    }
    res.status(_status).json({
        message: _message
    })
}