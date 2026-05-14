//Datos de usuario//
//punto1//
let nombreCompleto = "";
let edad = "";
let tipoDocumento = "";
let numeroDocumento = "";


//punto3//
let salario = "";
let comisiones = "";
let totalhorasExtra = "";
let niveldeRiesgo = "";
let recibeAuxilioTransporte = "";


//formulario//
const formsdatosGenerales = document.getElementById("datosGenerales");

const formularioSalario = document.getElementById("datos-Salariales");

const formularioMesada = document.getElementById("formMesada");


//constantes//
const salariominimolegalVigente = 1750905;

const subsidiodeTrasporte = 249095;

const uvT = 52.37;

const psalud = 0.04;

const pension = 0.04;

const fondodesolidaridadPensonal = 0.01;

const saludPensionado = 0.12;


//evento//
console.log("AQUI");


//funcion mensajes//
function mostrarMensaje(texto) {

    const caja =
    document.getElementById("error-message");

    caja.innerHTML =
    `Estimado usuario: ${texto}`;

    caja.style.display = "block";

}


//funcion ocultar mensajes//
function ocultarMensaje() {

    document.getElementById("error-message").style.display = "none";

}


//funcion validar usuario//
function validarUsuario() {

    document.getElementById("edad").setCustomValidity("");

    if (edad < 18) {

        mostrarMensaje("No se calcula porque es menor de edad");

        return false;

    }

    if (edad < 25) {

        mostrarMensaje("Usuario beneficiario por cotizante");

        return false;

    }

    if (edad < 60) {

        mostrarMensaje("Se calculan las cotizaciones");

        return true;

    }

    mostrarMensaje("Se calcula pensión por ser mayor de 60 años");

    return true;

}


document.getElementById("edad").addEventListener("input", function () {

    this.setCustomValidity("");

});


//primer formulario//
formsdatosGenerales.addEventListener("submit", function (event) {

    //evita recargar//
    event.preventDefault();

    ocultarMensaje();

    if (!formsdatosGenerales.checkValidity()) return;


    //capturar datos//
    nombreCompleto =
    document.getElementById("nombre").value.trim();

    edad =
    document.getElementById("edad").value.trim();

    tipoDocumento =
    document.getElementById("tipoDocumento").value;

    numeroDocumento =
    document.getElementById("numeroDocumento").value.trim();


    //validacion campos vacios//
    if (!nombreCompleto || !edad || !tipoDocumento || !numeroDocumento) {

        mostrarMensaje("Por favor complete todos los campos");

        return;

    }


    //validar nombre//
    const validarNombre =
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/;

    if (!validarNombre.test(nombreCompleto)) {

        mostrarMensaje("El nombre no permite emojis ni caracteres especiales");

        return;

    }


    //nombre corto//
    if (nombreCompleto.length < 2) {

        mostrarMensaje("El nombre es demasiado corto");

        return;

    }


    //nombre largo//
    if (nombreCompleto.length > 100) {

        mostrarMensaje("El nombre no puede superar 100 caracteres");

        return;

    }


    //edad//
    if (!/^[1-9][0-9]*$/.test(edad)) {

        mostrarMensaje("La edad debe contener solo números enteros y positivos");

        return;

    }


    //convertir edad a numero//
    edad = Number(edad);


    //edad maxima//
    if (edad > 180) {

        mostrarMensaje("La edad no puede superar 180 años");

        return;

    }


    //documento//
    if (!/^[0-9]+$/.test(numeroDocumento)) {

        mostrarMensaje("El documento solo permite números");

        return;

    }


    //documento minimo//
    if (numeroDocumento.length < 3) {

        mostrarMensaje("El documento debe tener mínimo 3 dígitos");

        return;

    }


    //documento maximo//
    if (numeroDocumento.length > 22) {

        mostrarMensaje("El documento no puede superar 22 dígitos");

        return;

    }


    //validar edad//
    if (!validarUsuario()) return;


    //ocultar formulario datos generales//
    formsdatosGenerales.classList.add("oculto");


    //mostrar segun edad//
    if (edad >= 60) {

        formularioMesada.classList.remove("oculto");

    } else {

        formularioSalario.classList.remove("oculto");

    }

});


//segundo formulario//
formularioSalario.addEventListener("submit", function (event) {

    //evita recargar//
    event.preventDefault();

    ocultarMensaje();


    //capturar datos//
    salario =
    Number(document.getElementById("salario").value);

    comisiones =
    Number(document.getElementById("comisiones").value);

    totalhorasExtra =
    Number(document.getElementById("horasExtra").value);

    niveldeRiesgo =
    Number(document.getElementById("riesgo").value);

    recibeAuxilioTransporte =
    document.getElementById("auxilioTransporte").value;


    //validaciones//
    if (isNaN(salario)) {

        mostrarMensaje("El salario debe estar en números");

        return;

    }

    if (salario <= 0) {

        mostrarMensaje("El salario debe ser positivo");

        return;

    }

    if (salario < 100000) {

        mostrarMensaje("El salario mínimo permitido es 100.000");

        return;

    }

    if (salario > 60000000) {

        mostrarMensaje("El salario no puede superar 60.000.000");

        return;

    }

    if (comisiones < 0) {

        mostrarMensaje("Las comisiones deben ser positivas");

        return;

    }

    if (totalhorasExtra < 0) {

        mostrarMensaje("Las horas extra no pueden ser negativas");

        return;

    }

    if (isNaN(niveldeRiesgo) || niveldeRiesgo === 0) {

        mostrarMensaje("Seleccione un nivel de riesgo");

        return;

    }


    //punto4//
    let salarioTotal =
    salario + comisiones + totalhorasExtra;

    let calculoIbc =
    salarioTotal * 0.7;

    let auxilioTransporte = 0;


    if (
        salario <= salariominimolegalVigente * 2 &&
        recibeAuxilioTransporte === "si"
    ) {

        auxilioTransporte =
        subsidiodeTrasporte;

    }


    let valorSalud =
    calculoIbc * psalud;

    let valorPension =
    calculoIbc * pension;

    let fondoSolidaridad = 0;


    if (calculoIbc >= salariominimolegalVigente * 4) {

        fondoSolidaridad =
        calculoIbc * fondodesolidaridadPensonal;

    }


    //retencion//
    let ingresoGravado =
    calculoIbc - (valorSalud + valorPension);

    let ingresoUVT =
    ingresoGravado / uvT;

    let retencionUVT = 0;


    if (ingresoUVT <= 95) {

        retencionUVT = 0;

    } else if (ingresoUVT <= 150) {

        retencionUVT =
        (ingresoUVT - 95) * 0.19;

    } else if (ingresoUVT <= 360) {

        retencionUVT =
        (ingresoUVT - 150) * 0.28 + 10;

    } else if (ingresoUVT <= 640) {

        retencionUVT =
        (ingresoUVT - 360) * 0.33 + 69;

    } else if (ingresoUVT <= 945) {

        retencionUVT =
        (ingresoUVT - 640) * 0.35 + 162;

    } else if (ingresoUVT <= 2300) {

        retencionUVT =
        (ingresoUVT - 945) * 0.37 + 268;

    } else {

        retencionUVT =
        (ingresoUVT - 2300) * 0.39 + 770;

    }


    let retencion =
    retencionUVT * uvT;


    //porcentaje de riesgo//
    let arl =
    calculoIbc * niveldeRiesgo;


    //total//
    let deducciones =
    valorSalud +
    valorPension +
    fondoSolidaridad +
    retencion +
    arl;

    let total =
    salarioTotal +
    auxilioTransporte -
    deducciones;


    //porcentajes//
    let totalGrafica =
    valorSalud +
    valorPension +
    arl +
    retencion +
    total;

    let pSalud =
    (valorSalud / totalGrafica) * 100;

    let pPension =
    (valorPension / totalGrafica) * 100;

    let pArl =
    (arl / totalGrafica) * 100;

    let pRetencion =
    (retencion / totalGrafica) * 100;


    //crear grafica//
    document.querySelector(".circulo").style.background = `
    conic-gradient(
    #ef4444 0% ${pSalud}%,
    #f59e0b ${pSalud}% ${pSalud + pPension}%,
    #10b981 ${pSalud + pPension}% ${pSalud + pPension + pArl}%,
    #8b5cf6 ${pSalud + pPension + pArl}% ${pSalud + pPension + pArl + pRetencion}%,
    #2563eb ${pSalud + pPension + pArl + pRetencion}% 100%
    )`;


    //leyenda normal//
    document.querySelector(".leyenda").innerHTML = `

    <p><span class="rojo"></span>Salud</p>
    <p><span class="naranja"></span>Pensión</p>
    <p><span class="verde"></span>ARL</p>
    <p><span class="morado"></span>Retención</p>
    <p><span class="azul"></span>Neto</p>

    `;


    //mostrar resultados//
    formularioSalario.classList.add("oculto");

    document.getElementById("resultados").classList.remove("oculto");

    document.querySelector(".form-layout").style.display = "none";


    //total centro grafica//
    document.getElementById("totalCirculo").innerHTML =
    `$${total.toLocaleString()}`;


    //imprimir resultados//
    document.getElementById("contenidoResultados").innerHTML = `

    <p><strong>Empleado:</strong>
    ${nombreCompleto}</p>

    <p><strong>Edad:</strong>
    ${edad}</p>

    <p><strong>Documento:</strong>
    ${tipoDocumento} ${numeroDocumento}</p>

    <hr>

    <p><strong>Salario:</strong>
    $${salario.toLocaleString()}</p>

    <p><strong>Comisiones:</strong>
    $${comisiones.toLocaleString()}</p>

    <p><strong>Horas Extra:</strong>
    $${totalhorasExtra.toLocaleString()}</p>

    <p><strong>IBC:</strong>
    $${calculoIbc.toLocaleString()}</p>

    <p><strong>Salud:</strong>
    $${valorSalud.toLocaleString()}</p>

    <p><strong>Pensión:</strong>
    $${valorPension.toLocaleString()}</p>

    <p><strong>ARL:</strong>
    $${arl.toLocaleString()}</p>

    <p><strong>Retención:</strong>
    $${retencion.toLocaleString()}</p>

    <p><strong>Total Final:</strong>
    $${total.toLocaleString()}</p>

    `;

});


//formulario pension//
formularioMesada.addEventListener("submit", function(event) {

    //evita recargar//
    event.preventDefault();

    ocultarMensaje();


    //capturar datos//
    let mesada =
    Number(document.getElementById("mesada").value);


    //validaciones//
    if (isNaN(mesada) || mesada <= 0) {

        mostrarMensaje("Ingrese una mesada válida");

        return;

    }


    //calculo pensionado//
    let descuentoSalud =
    mesada * saludPensionado;

    let totalMesada =
    mesada - descuentoSalud;


    //porcentajes pensionado//
    let pSalud =
    (descuentoSalud / mesada) * 100;

    let pNeto =
    (totalMesada / mesada) * 100;


    //crear grafica pensionado//
    document.querySelector(".circulo").style.background = `
    conic-gradient(
    #ef4444 0% ${pSalud}%,
    #2563eb ${pSalud}% 100%
    )`;


    //cambiar leyenda pensionado//
    document.querySelector(".leyenda").innerHTML = `

    <p><span class="rojo"></span>Salud</p>

    <p><span class="azul"></span>Neto</p>

    `;


    //mostrar resultados//
    formularioMesada.classList.add("oculto");

    document.getElementById("resultados").classList.remove("oculto");

    document.querySelector(".form-layout").style.display = "none";


    //total centro grafica//
    document.getElementById("totalCirculo").innerHTML =
    `$${totalMesada.toLocaleString()}`;


    //imprimir resultados//
    document.getElementById("contenidoResultados").innerHTML = `

    <p><strong>Pensionado:</strong>
    ${nombreCompleto}</p>

    <p><strong>Edad:</strong>
    ${edad}</p>

    <p><strong>Documento:</strong>
    ${tipoDocumento} ${numeroDocumento}</p>

    <hr>

    <p><strong>Mesada:</strong>
    $${mesada.toLocaleString()}</p>

    <p><strong>Descuento Salud:</strong>
    $${descuentoSalud.toLocaleString()}</p>

    <p><strong>Total Neto:</strong>
    $${totalMesada.toLocaleString()}</p>

    `;

});