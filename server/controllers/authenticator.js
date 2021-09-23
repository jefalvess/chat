const jwt = require('jsonwebtoken');

const validateUserToken = (req, res, next) => {
    try {
        const token = req.body.token;

        const validated = token? jwt.verify(token, process.env.JWT_KEY): false;

        if (!validated) {
            console.log('TOKEN EXPIRADO') 
            return res.status(400).json({ status: false, message: "[ INVALID TOKEN - JWT ]" });
        }

        const userInfo = JSON.parse(validated.data);

        if (userInfo.usuarioChat !== true) {
            console.log('SEM ACESSO')
            return res.status(400).json({ status: false, message: "[ INVALID ACCESS - JWT]" });
        }
    
        req.user =  { status: true, usuario: userInfo.usuario, token: token }

        next();

    } catch (e) {
         console.log('TOKEN COM ERRO')
         return res.status(400).json({ status: false, message: "[ ERROR TOKEN - JWT ]" });
    }
}

module.exports = {
    validateUserToken
}