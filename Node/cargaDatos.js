const fs = require('fs')
const mongoose = require('mongoose')
const Producto = require("./modelo/entidades/producto").Producto

let productos = [
    {
        "nombre"      : "Chintáfono",
        "categoria"   : "Aparatos",
        "fabricante"  : "Ibérica de Aparatos S.A.",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen1",
        "precio"      : 15,
        "existencias" : 100
    },
    {
        "nombre"      : "Fleje",
        "categoria"   : "Elementos",
        "fabricante"  : "Flejes Reunidoscls",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen2",
        "precio"      : 30,
        "existencias" : 100
    },
    {
        "nombre"      : "Elemento Disruptor",
        "categoria"   : "Elementos",
        "fabricante"  : "Antúnez e Hijos S.L.",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen3",
        "precio"      : 50,
        "existencias" : 100
    },
    {
        "nombre"      : "Pendulador Pirotécnico",
        "categoria"   : "Aparatos",
        "fabricante"  : "Pirotécnicas Valencianas S.A.",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen4",
        "precio"      : 75,
        "existencias" : 100
    },
    {
        "nombre"      : "Turbo scooter",
        "categoria"   : "Vehículos",
        "fabricante"  : "Amotos Ruidosas de la Armuña",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen5",
        "precio"      : 500,
        "existencias" : 100
    },
    {
        "nombre"      : "Zeppelin",
        "categoria"   : "Vehículos",
        "fabricante"  : "Zeppelines de Prusia",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen5",
        "precio"      : 1500,
        "existencias" : 100
    },
    {
        "nombre"      : "Escuadra de medir esquinas",
        "categoria"   : "Herramientas",
        "fabricante"  : "Herramientas Peninsulares S.A.",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen6",
        "precio"      : 40,
        "existencias" : 100
    },
    {
        "nombre"      : "Imán de buscar vóltios",
        "categoria"   : "Herramientas",
        "fabricante"  : "Herramientas Peninsulares S.A.",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen7",
        "precio"      : 50,
        "existencias" : 100
    }
]

let configuracion = JSON.parse(fs.readFileSync("./configuracion.json").toString())

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(configuracion.url, { useNewUrlParser : true, useUnifiedTopology: true, useFindAndModify:true })
.then( () => {
    return Producto.deleteMany({})
})
.then( rs => {
    console.log(rs)
    return Producto.insertMany(productos)
})
.then( x => {
    console.log(x)
    return mongoose.disconnect()
})
.then(() => {
    console.log("FIN")
})
.catch( error => console.log(error))

