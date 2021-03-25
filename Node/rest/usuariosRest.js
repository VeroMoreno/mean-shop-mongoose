const express = require("express")
const negocioUsuarios = require("../modelo/negocio/negocioUsuarios")

let router = express.Router()

// esto no es rest
router.get("/comprobarLogin", comprobarLogin)

router.post("/usuarios", altaUsuario)
router.delete("/usuarios/:id", bajaUsuario)
router.put("/usuarios/:id", modificarUsuario)


exports.router = router

//////////////////////////////////////
//Funciones con la lógica de control//
//////////////////////////////////////

// Funciones con la lógica de control
function comprobarLogin(request, response) {
    let login = request.query.login
    negocioUsuarios.comprobarLogin(login)
    .then(existe => {
        response.json({ existe : existe })
    })
    .catch(error => {
        response.statusCode = error.codigo
        response.json(error)
    })
}

function altaUsuario(request, response) {
    let usuario = request.body
    negocioUsuarios.altaUsuario(usuario)
    .then(usrInsertado => {
        response.statusCode = 201;
        response.json(usrInsertado)
    })
    .catch(error => {
        response.statusCode = error.codigo
        response.json(error)
    })
}

function bajaUsuario(request, response) {
    response.end("USUARIO BORRADO")
}

function modificarUsuario(request, response) {
    let usuario = request.body
    let id = request.params.id
    usuario._id = id
    negocioUsuarios.modificarUsuario(usuario, request.autoridad)
    .then(usuarioModificado => {
        response.json(usuarioModificado)
    })
    .catch(err => {
        console.log(err)
        response.statusCode = err.codigo
        response.json(err)
    })
}