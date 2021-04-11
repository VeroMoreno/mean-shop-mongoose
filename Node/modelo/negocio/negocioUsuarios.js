//npm install validatorjs
const validadorUtil = require('../../util/validadorUtil')
const Usuario = require("../entidades/usuario").Usuario


let reglasUsrInsercion = {
  nombre : 'required|min:3|max:40',
  login  : 'required|min:5|max:15',
  pw     : 'required|min:5|max:15',
  correoE: 'required|email',
}

let reglasUsrModificacion = {
  nombre    : 'required|min:3|max:40',
  pw        : 'required|min:5|max:15',
  direccion : 'required|min:5|max:200',
  telefono  : 'required|min:5|max:20',
  correoE   : 'required|email',
}


// POST /login con body login + pw
exports.buscarPorLoginYPw = function(login, pw){
  return new Promise(function(resolve, reject) {
    criterio = {
      login: login,
      pw : pw
    }
    // mongoDBUtil.esquema.collection("usuarios")
      Usuario.findOne(criterio)
      .then(usuario => {
        if(!usuario) {
          reject({codigo:404, mensaje: "Autentication: No existe un usuario con esas credenciales!"})
          return
        }
        /* Aque el usuario tiene pw, se lo quitamos porque a nadie le interesa */
        delete usuario.pw
        resolve(usuario)
      })
      .catch(error => {
        reject({codigo:500, mensaje: "Error en la bbdd!"})
      })
  })
}

// GET /comprobarLogin?login=valor
exports.comprobarLogin = function (login) {
  return new Promise(function(resolve, reject){
    Usuario.findOne({ login : login })
    .then( resultado => {
        if(resultado){
            resolve(true)
        } else {
            resolve(false)
        }
    })
    .catch(() => {
        reject({ codigo:500, mensaje:'¡Error con la base de datos!' })
    })
})
}

// POST /usuarios - res: {json}
exports.altaUsuario = function(usuario) {
  return new Promise(function(resolve,reject) {

    if(!validadorUtil.validarObjeto(usuario, reglasUsrInsercion)){
      return
  }
    //Le asignamos el rol al usuario
    usuario.rol = 'CLIENTE'

    exports.comprobarLogin(usuario.login)
    .then(existe => {
      if(existe == true) {
        reject( { codigo:400, mensaje:'Ya existe un usuario con el mismo login' })
        return
      }
      let usuarioMG = new Usuario(usuario)
      return usuarioMG.save()
    })
    .then(usuarioInsertado => {
      resolve(usuarioInsertado)
    })
    .catch(error => {
      console.log(error)
      reject({ codigo:500, mensaje: 'Error con la bbdd!'})
    })
  })
}

//Autorización:
//-los ADMIN pueden modificar a cualquier usuario
//-los CLIENTE solo puededn modificarse a si mismos
exports.modificarUsuario = function(usuario, autoridad) {
  return new Promise(function(resolve, reject) {

    if (autoridad.rol != 'ADMIN') {
      if (autoridad._id != usuario._id) {
        reject({ codigo:403, mensaje: "Los clientes solo pueden modificarse a si mismos"})
        return
      }
    }

    if (!validadorUtil.validarObjeto(usuario, reglasUsrModificacion, reject)){
      return
    }
    Usuario.findByIdAndUpdate(usuario._id, usuario)
    // Mongo - findOneAndUpdate
    .then(usuarioModificado => {
      if(!usuarioModificado){
        reject({ codigo:404, mensaje:"No existe un usuario con el id " + usuario._id})
        return
      }
      resolve(usuarioModificado)
      })
    .catch( () => {
      reject({ codigo:500, mensaje: 'Error con la bbdd!'})
    })
  })
}




