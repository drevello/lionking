//REGISTRO DE POTENCIALES CLIENTES:

//Variables globales

let nombre;
let apellidos;
let documento;
let fechaNacimiento;
let departamento;
let domicilio;
let correo;
let capitalInicial;
let edadRetiro;
let periodicidad;
let edadActual;
let capitalFinal;
let inputNombre = document.getElementById("inputNombre");
let inputApellidos = document.getElementById("inputApellidos");
let inputDocumento = document.getElementById("inputDocumento");
let inputDomicilio = document.getElementById("inputDomicilio");
let inputDepartamento = document.getElementById("selectDepartamento");
let inputEmail = document.getElementById("inputEmail");
let inputPeriodicidad = document.getElementById("inputPeriodicidad");
let inputNacimiento = document.getElementById("inputNacimiento");
let inputImporte = document.getElementById("inputImporte");
let inputEdadCobro = document.getElementById("inputEdadCobro");
let inputCheck = document.getElementById("inputCheck");
let mensajeCheck = document.getElementById("mensajeCheck");
let mensajeEdad1 = document.getElementById("mensajeEdad1");
let mensajeEdad2 = document.getElementById("mensajeEdad2");
let mensajeResultado = document.getElementById("resultado1");
let botonEnviarMensaje = document.getElementById("Enviar");
let inputNombreMensaje = document.getElementById("nombre");
let inputEmailMensaje = document.getElementById("email");
let inputMensaje = document.getElementById("mensaje");

// CARGA DE DATOS VALOR DE ACCIÓN LIONKING.SA
function cargarDatosAccion() {
    fetch("https://bevsa.free.beeceptor.com/companias/C01")
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => {
            console.log(error)
        })
}

cargarDatosAccion()

// CARGA DE DATOS GUARDADOS:
let usuarioRecuperado = window.localStorage.getItem('objetoUsuario');
const objetoUsuarioRecuperado = JSON.parse(usuarioRecuperado)


function preCargarDatos() {
    if (objetoUsuarioRecuperado) {
        for (const propiedad in objetoUsuarioRecuperado) {
            if (objetoUsuarioRecuperado[propiedad] !== null)
                switch (propiedad) {
                    case 'nombre':
                        inputNombre.value = objetoUsuarioRecuperado[propiedad];
                        break;
                    case 'apellidos':
                        inputApellidos.value = objetoUsuarioRecuperado[propiedad];
                        break;
                    case 'documento':
                        inputDocumento.value = objetoUsuarioRecuperado[propiedad];
                        break;
                    case 'fechaNacimiento':
                        inputNacimiento.value = objetoUsuarioRecuperado[propiedad];
                        break;
                    case 'domicilio':
                        inputDomicilio.value = objetoUsuarioRecuperado[propiedad];
                        break;
                    case 'departamento':
                        inputDepartamento.options[inputDepartamento.selectedIndex].text = objetoUsuarioRecuperado[propiedad];
                        break;
                    case 'correo':
                        inputEmail.value = objetoUsuarioRecuperado[propiedad];
                        break;
                    default:
                        // no hacer nada
                        break;
                }
        }
    }
}

preCargarDatos()

// MANEJO ERROR
function agregarError(e) {
    e.style.borderColor = "red";
}
function quitarError(e) {
    e.style.borderColor = "lightgrey";
}
function borrarMensaje(e) {
    mensajesError.parentNode.removeChild(e);
}

//VALIDACIÓN DEL FORMULARIO

function validarFormulario() {
    let fechaNacimientoJs = Date.parse(document.getElementById("inputNacimiento").value);
    edadActual = Math.floor((new Date() - fechaNacimientoJs) / 31536000000);
    documento = inputDocumento.value;
    domicilio = inputDomicilio.value;
    departamento = inputDepartamento.options[inputDepartamento.selectedIndex].text;
    correo = inputEmail.value;
    periodicidad = inputPeriodicidad.options[inputPeriodicidad.selectedIndex].text;


    //Validar campo "nombre"

    if (inputNombre.value == "") {
        agregarError(inputNombre);
    } else {
        quitarError(inputNombre);
        nombre = inputNombre.value
    }

    //Validar campo "apellidos"

    if (inputApellidos.value == "") {
        agregarError(inputApellidos);
    } else {
        quitarError(inputApellidos);
        apellidos = inputApellidos.value
    }

    //Validar campo fecha de nacimiento

    if (!inputNacimiento.value) {
        agregarError(inputNacimiento);
    } else {
        quitarError(inputNacimiento);
        fechaNacimiento = inputNacimiento.value
    }

    //Validar campo importe a depositar

    if (isNaN(inputImporte.value) || inputImporte.value <= 0) {
        agregarError(inputImporte);
    } else {
        quitarError(inputImporte);
        capitalInicial = inputImporte.value
    }

    //Validar edad de comienzo de cobro
    if (inputEdadCobro.value === '') {
        agregarError(inputEdadCobro);
    } else {
        quitarError(inputEdadCobro);
        edadRetiro = inputEdadCobro.value
    }

    if (inputEdadCobro.value <= edadActual) {
        mensajeEdad1.innerHTML = '';
        let errorEdad1 = document.createElement("p");
        errorEdad1.innerHTML = "La edad para comenzar a cobrar su renta debe ser estrictamente superior a su edad actual.";
        mensajeEdad1.appendChild(errorEdad1);
        agregarError(inputEdadCobro);
    } else {
        quitarError(inputEdadCobro);
        mensajeEdad1.innerHTML = '';
        edadRetiro = inputEdadCobro.value
    }

    if (inputEdadCobro.value >= 85) {
        mensajeEdad2.innerHTML = '';
        let errorEdad2 = document.createElement("p");
        errorEdad2.innerHTML = "La edad para comenzar a cobrar su renta debe ser estrictamente menor a 85 años.";
        mensajeEdad2.appendChild(errorEdad2);
        agregarError(inputEdadCobro);
    } else {
        quitarError(inputEdadCobro);
        mensajeEdad2.innerHTML = '';
        edadRetiro = inputEdadCobro.value
    }

    if (!inputCheck.checked) {
        mensajeCheck.innerHTML = '';
        let errorCheckBox = document.createElement("p");
        errorCheckBox.innerHTML = "Para continuar debe aceptar los términos y condiciones.";
        mensajeCheck.appendChild(errorCheckBox);
    } else {
        mensajeCheck.innerHTML = '';
    }


}

// CALCULOS DE RENTA
const RentabilidadesAnuales = []

function cicloCapitalizacion() {
    capitalFinal = capitalInicial
    const periodoCapitalizacion = parseInt(edadRetiro - edadActual);
    let contador = 1
    while (contador <= periodoCapitalizacion) {
        RentabilidadesAnuales.push(capitalFinal * 0.09);
        capitalFinal = parseFloat(capitalFinal) + parseFloat(capitalFinal * 0.09);
        contador++;
        console.log(capitalFinal)
    }
}

let rentaAnual;

function calculoRentaAnual() {
    const rentaAnualSinComision = (capitalFinal / (85 - edadRetiro));
    rentaAnual = (rentaAnualSinComision - (rentaAnualSinComision * 0.02)).toFixed(2);
}

let rentaMensual;

function calculoRentaMensual() {
    rentaMensual = (rentaAnual / 12).toFixed(2);
}

// ALMACENAMIENTO EN STORAGE
function Usuario(nombre, apellidos, documento, fechaNacimiento, domicilio, departamento, correo) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.documento = documento;
    this.fechaNacimiento = fechaNacimiento;
    this.domicilio = domicilio;
    this.departamento = departamento;
    this.correo = correo;
}

function guardarUsuario() {
    const usuario1 = new Usuario(nombre, apellidos, documento, fechaNacimiento, domicilio, departamento, correo);
    localStorage.setItem('objetoUsuario', JSON.stringify(usuario1));
}

let rentaCalculada;

function rentaResultante() {
    if (periodicidad == "Anual") {
        calculoRentaAnual();
        rentaCalculada = rentaAnual;
    } else {
        calculoRentaAnual();
        calculoRentaMensual();
        rentaCalculada = rentaMensual;
    }
};
function mostrarResultado() {
    document.getElementById("resultado").style.display = "none";
    if (rentaCalculada >= 0 && validarFormulario) {
        mensajeResultado.innerHTML = "Estimado/a " + nombre + " " + apellidos + "," + " la renta " + periodicidad.toLowerCase() + " resultante es de $" + rentaCalculada;
        document.getElementById("resultado").style.display = "flex";
    }
}

formulario.addEventListener("submit", function (evt) {
    evt.preventDefault();
    validarFormulario();
        //Verificar campos o detener ejecución.

        if (inputNombre.value == "") {
            return false;
        }
    
        if (inputApellidos.value == "") {
            return false;
        }
    
        if (!inputNacimiento.value) {
            return false;
        }
    
        if (isNaN(inputImporte.value) || inputImporte.value <= 0) {
            return false;
        }
    
        if (inputEdadCobro.value <= edadActual) {
            return false;
        }
    
        if (inputEdadCobro.value >= 85) {
            return false;
        }
    
        if (!inputCheck.checked) {
            console.log("hola")
            return false;
        }
    cicloCapitalizacion();
    rentaResultante();
    guardarUsuario();
    mostrarResultado();
});

botonEnviarMensaje.onclick = function () { enviarMensaje() };


function enviarMensaje() {
    //Validar campos
    if (inputNombreMensaje.value === '') {
        agregarError(inputNombreMensaje);
    } else {
        quitarError(inputNombreMensaje);
    }
    if (inputEmailMensaje.value === '') {
        agregarError(inputEmailMensaje);
    } else {
        quitarError(inputEmailMensaje);
    }
    if (inputMensaje.value === '') {
        agregarError(inputMensaje);

    } else {
        quitarError(inputMensaje);
    }

    if (inputNombreMensaje.value === '') {
        return false;
    }
    if (inputEmailMensaje.value === '') {
        return false;
    }
    if (inputMensaje.value === '') {
        return false;
    }

    //Enviar POST con datos
    let datos = {
        nombre: inputNombreMensaje.value,
        email: inputEmailMensaje.value,
        mensaje: inputMensaje.value
    }
    fetch('https://bevsa.free.beeceptor.com/mensajes', {
        method: "POST",
        body: JSON.stringify(datos)
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch((error) => {
            console.log(error)
        })
    Swal.fire({
        title: '¡Mensaje Enviado!',
        text: 'Nos comunicaremos contigo próximamente.',
        icon: 'success',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#0d6efd'
    })
}


