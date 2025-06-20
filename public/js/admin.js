const sectionInsert = document.querySelector("#insert")
const sectionUpdate = document.querySelector("#update")

sectionUpdate.style.display = "none"


// ESTA FUNCION SE ACTIVA AL PRESIONAR EL BOTON BORRAR
// EL FETCH LE PIDE A LA APP QUE EJECUTE EN LA RUTA /delete/-id del item- UN DELETE
// DESPUES DEL BORRADO, TRANSFORMAMOS LA RESPUESTA DEL SERVIDOR A JSON Y LE PEDIMOS QUE SE REFLEJE EN LA PANTALLA
    function borrarDestino(id) {
// LAS FETCH SON ASINCRONAS, POR UN LADO LA RESPUESTA SE ENVIA AL SERVIDOR CON EL PRIMER .then, EN PARALELO EL LOTRO CODIGO .then SIGUIENTE SE EJECUTA
// ASI QUE PUEDE CAUSARNOS PROBLEMAS. CON LO CUAL VAMOS A APLICARLE UN setTimeout        
      fetch(`/delete/${id}`, {method: "DELETE"})
      .then(response => response.json())
      .then( setTimeout(() => location.reload(), 300)).catch(error => console.log(error))
    }

// FUNCIONES NECESARIAS PARA HACER EL UPDATE
// PRIMERO TOMAR LOS DATOS DEL ITEM Y QUE SE MUESTRE EN EL FORMULARIO update
    function editarDestino(item){
        sectionInsert.style.display = "none"
        sectionUpdate.style.display = "block"

        let Uitem = JSON.parse(item)
        console.log(Uitem.id);
        document.getElementById("idUpdate").value = Uitem.id
        document.getElementById("rutaUpdate").value = Uitem.ruta
        document.getElementById("lugarUpdate").value = Uitem.lugar
        document.getElementById("nombreUpdate").value = Uitem.nombre
        document.getElementById("descripcionUpdate").value = Uitem.descripcion
        document.getElementById("precioUpdate").value = Uitem.precio
        document.getElementById("imgUpdate").value = Uitem.img

    }

    const formUpdate = document.forms['update']

    formUpdate.addEventListener('submit', (e) =>{
        e.preventDefault()
        let Udata = {}
        Udata.id = formUpdate['idUpdate'].value
        Udata.ruta = formUpdate['rutaUpdate'].value
        Udata.lugar = formUpdate['lugarUpdate'].value
        Udata.nombre = formUpdate['nombreUpdate'].value
        Udata.descripcion = formUpdate['descripcionUpdate'].value
        Udata.precio = formUpdate['precioUpdate'].value
        Udata.img = formUpdate['imgUpdate'].value

        console.log(Udata);

        fetch(`/update/${Udata.id}`, {method : "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(Udata)})
        .then(response => response.json())
        .then(setTimeout(() => location.reload(), 300)).catch(error => console.log(error))
    })

    