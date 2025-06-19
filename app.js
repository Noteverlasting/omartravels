const path = require('node:path')
const fs = require('node:fs')
const crypto = require('node:crypto') // Para obtener la informacion por POST
const express = require('express')
const app = express()
let ejs = require('ejs')

process.loadEnvFile()
const PORT = process.env.PORT || 3000

//middlewares
app.use(express.urlencoded( {extended : true }) )
app.use(express.json())

// Para indicarle que vamos a trabajar con una motor de plantillas (en este caso ejs):
app.set("view engine", "ejs");
// Indicar la carpeta de los recursos estáticos como css, javascript, imagenes, videos...
app.use(express.static(path.join(__dirname, "public")));
// Indicar la carpeta donde estarán las vistas o plantilas ejs
app.set("views", "./views");

// Usar los datos del json travelscopy
const jsonDatos = require("./data/travelscopy.json");


//RUTAS:
jsonDatos.forEach((travel) => {
    app.get(`${travel.ruta}`, (req, res) => {
        res.render('travels',{
            "lugar":`${travel.lugar}`,
            "nombre":`${travel.nombre}`,
            "descripcion":`${travel.descripcion}`,
            "precio":`${travel.precio}`,
            "img":`${travel.img}`,
            "datos": jsonDatos
        })
    })

})

app.get("/admin", (req, res) => {
    res.render("admin", {jsonDatos})
})

app.post('/insert', (req, res) => {
    // req.body es un objeto que contiene los datos enviados por el formulario
    console.log(req.body)
    // La guardamos en una variable
    const newTravel = req.body
    // Indicamos que la key ruta ya contenga "/" para no tener que escribirla en el formu
    newTravel.ruta = "/" + newTravel.ruta
    // Indicamos tambien que convierta los numeros de string a numero con decimales
    newTravel.precio = parseFloat(newTravel.precio)
    // Agregamos con push el nuevo viaje a nuestro array json
    jsonDatos.push(newTravel)
    console.log(jsonDatos)
    // Guardamos los cambios en el archivo json y redirigimos a la ruta admin
    fs.writeFileSync(path.join(__dirname, "data", "travelscopy.json"), JSON.stringify(jsonDatos, null, 2), "utf-8")
    res.redirect("/admin")
})





app.use((req, res) => {
  res.status(404).render("404", {lugar: "404", nombre: "404 página no encontrada", datos:jsonDatos});
});


app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
})