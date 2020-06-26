const jwt = require('jsonwebtoken');

module.exports = {
    verifyUser:function(body){
        console.log(body);
        //verify user later
        let token = jwt.sign(body,'tokenpassword');
        return {...body,...{token:token}}
    }
}