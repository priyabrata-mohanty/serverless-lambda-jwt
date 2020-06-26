const jwt = require('jsonwebtoken');
const { HTTP_STATUS_CODES } = require('../utils/status-codes');

module.exports = {
    verifyToken: (req, res, config) => {
        return new Promise((resolve, reject) => {
            if (!req.headers.Authorization) {
                reject ({
                    statusCode: HTTP_STATUS_CODES.NOT_AUTHORIZED.toString(),
                    success: false,
                    message: 'Please pass the token for authentication'
                })
            } else {
                let token = req.headers.Authorization.split(' ')[1];
                if (token === 'null') {
                    reject ({
                        statusCode: HTTP_STATUS_CODES.NOT_AUTHORIZED.toString(),
                        success: false,
                        message: 'Please pass the correct token for authentication'
                    })
                } else {
                    jwt.verify(token, 'tokenpassword', (err, decode) => {
                        if (err) {
                            reject({
                                statusCode: HTTP_STATUS_CODES.NOT_AUTHORIZED.toString(),
                                success: false,
                                message: 'Token varification failed, please try again'
                            })
                        } else {
                            if (decode.userId) {
                                resolve({
                                    statusCode: HTTP_STATUS_CODES.OK.toString(),
                                    success: true,
                                    message: 'authorized'
                                })
                            } else {
                                reject({
                                    statusCode: HTTP_STATUS_CODES.NOT_AUTHORIZED.toString(),
                                    success: false,
                                    message: 'UnAuthorized'
                                })
                            }
                        }
                    })
                }
            }
        })
    }
}
