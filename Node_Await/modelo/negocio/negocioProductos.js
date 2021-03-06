const Producto = require("../entidades/producto").Producto
const validadorUtil = require("../../util/validadorUtil")

let reglasProd = {
	nombre      : 'required',
	categoria   : 'required',
	fabricante  : 'required',
	descripcion : 'required',
	imagen      : 'required',
	precio      : 'required|min:0',
	existencias : 'required|min:0'
}

//Los usuarios autenticados pueden listar productos
exports.listarProductos = function(criterio){
    return new Promise(async function(resolve, reject){
        //revisar el criterio y adaptarlo a las necesidades de MongoDB...
        /*
        {
            texto : 'string',
            fabricante : 'string',
            categoria  : {
                    _id    : 'string',
                    nombre : 'string'
                }
            precioMin  : 123,
            precioMax  : 456
        }
        */

        let filtro = {}

        if(criterio.categoria){
            filtro["categoria._id"] = criterio.categoria
        }

        let precio = {
            $gte : 0,
            $lte : Number.MAX_SAFE_INTEGER
        }
        if( criterio.precioMin){
            precio.$gte = criterio.precioMin
        }
        if( criterio.precioMax){
            precio.$lte = criterio.precioMax
        }
        filtro.precio = precio

        if(criterio.texto){
            filtro.nombre = criterio.texto
        }

        console.log("Filtro:", filtro)

        resolve(await Producto.find(filtro))
    })
}
//Los usuarios autenticados pueden buscar productos
exports.buscarProducto = function(idProducto){
    return new Promise(async function(resolve, reject){
        let productoEncontrado = await Producto.findById(idProducto)
        if(!productoEncontrado){
            reject({ codigo:404, mensaje:"No existe un producto con ese id"})
            return
        }
        resolve(productoEncontrado)
    })
}

exports.insertarProducto = function(producto, autoridad){

    return new Promise(async function(resolve, reject){

        if(autoridad.rol != "ADMIN"){
            reject({ codigo:403, mensaje: 'Solo los administradores pueden insertar productos'})
            return
        }

        //Retiramos cualquier id que venga en el producto
        delete producto._id

        if(!validadorUtil.validarObjeto(producto, reglasProd, reject)){
            return
        }

        let productoMG = new Producto(producto)

        try {
            resolve( await productoMG.save() )
        } catch (error){
            console.log(error)
            reject({ codigo:500, mensaje:"Error en la base de datos"})
        }
    })
}