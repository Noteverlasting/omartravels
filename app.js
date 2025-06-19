const path = require('node:path')
const express = require('express')
const app = express()
let ejs = require('ejs')

process.loadEnvFile()
const PORT = process.env.PORT || 3000

// Para indicarle que vamos a trabajar con una motor de plantillas (en este caso ejs):
app.set("view engine", "ejs");
// Indicar la carpeta de los recursos estáticos como css, javascript, imagenes, videos...
app.use(express.static(path.join(__dirname, "public")));
// Indicar la carpeta donde estarán las vistas o plantilas ejs
app.set("views", "./views");

// Usar los datos del json travelscopy
const jsonDatos = require("./data/travelscopy.json");

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

//RUTAS:
app.get('/', (req, res) =>{
    res.send('OK')
})








app.use((req, res) => {
  res.status(404).render("404", {lugar: "404", nombre: "404 página no encontrada", datos:jsonDatos});
});


app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
})