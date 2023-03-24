const {response } =  require('express');
const jwt = require("jsonwebtoken");

const validarJWT = (req, res=response, next) =>{

    //x-token headers

    const token = req.header('x-token');

    console.log(token);

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "no hay token"
        });
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no válido'
        })
    }

    next(); 


}


module.exports = {
    validarJWT
}