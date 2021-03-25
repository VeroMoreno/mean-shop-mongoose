//npm install jsonwebtoken
const jwt = require('jsonwebtoken')
const JWTUtil = require('../util/JWTUtil')
const express = require('express')
const negocioUsuarios = require("../modelo/negocio/negocioUsuarios")

let router = express.Router()

router.post('/login', autenticarUsuario)
// ?
exports.router = router
function autenticarUsuario(request, response) {
  let obj = request.body
  negocioUsuarios.buscarPorLoginYPw(obj.login, obj.pw)
  .then(usuario => {
    let token = jwt.sign(
      {
        _id : usuario._id,
        login: usuario.login,
        rol: usuario.rol
      },
      JWTUtil.getClave(),
      {
        algorithm: 'HS512'
      }
    )
    //Colocando el jwt en la cabecera de la respuesta
    //response.setHeader('Authorization','Bearer '+token)
    //response.setHeader('Access-Control-Expose-Headers', 'Authorization')

    //Añadiremos el token al body de la respuesta
    //Le retiramos el pw al usuario
    delete usuario.pw
    let respuesta = {
      usuario : usuario,
      JWT     : token
    }
    response.json(respuesta)
  })
  .catch(error => {
    console.log(error)
    response.statusCode = error.codigo
    response.json(error)
  })
}