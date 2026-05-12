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


//formulario//
const formsdatosGenerales =
document.getElementById("datosGenerales");

const formularioSalario =
document.getElementById("datos-Salariales");


//constantes//
const salariominimolegalVigente = 1750905;

const subsidiodeTrasporte = 249095;

const uvT = 52.37;

const psalud = 0.04;

const pension = 0.04;

const fondodesolidaridadPensonal = 0.01;


//evento//
console.log("AQUI");


//funcion validar usuario//
function validarUsuario() {

      const inputEdad =
     document.getElementById("edad");
     inputEdad.setCustomValidity("");

    if (edad < 18) {

        alert("No se calcula porque es menor de edad");

        return false;

    } else if (edad >= 18 && edad <= 25) {

        alert("No se calcula porque es beneficiario");

        return false;

    } else if (edad > 25 && edad <= 60) {

        alert("Se calculan las cotizaciones");

        return true;

    } else if (edad > 60) {

        alert("Se calcula pensión por ser mayor de 60 años");

        return true;

    }
}

     document.getElementById("edad").addEventListener("input", function() {

      this.setCustomValidity("");

 });

//primer formulario//
 formsdatosGenerales.addEventListener("submit", function(event) {
     if (!formsdatosGenerales.checkValidity()) {
      return;
 }

    //evita recargar//
    event.preventDefault();


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
    if (

        nombreCompleto === "" ||

        edad === "" ||

        tipoDocumento === "" ||

        numeroDocumento === ""

    ) {

        alert("Por favor complete todos los campos");

        return;

    }


    //validar nombre//
    const validarNombre =

    /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/;


    if (!validarNombre.test(nombreCompleto)) {

        alert("El nombre no permite emojis ni caracteres especiales");

        return;

    }


    //nombre corto//
    if (nombreCompleto.length < 2) {

        alert("El nombre es demasiado corto");

        return;

    }


    //nombre largo//
    if (nombreCompleto.length > 100) {

        alert("El nombre no puede superar 100 caracteres");

        return;

    }


    //edad solo numeros enteros//
    if (!/^[0-9]+$/.test(edad)) {

        alert("La edad debe contener solo números enteros");

        return;

    }


    //convertir edad a numero//
    edad = Number(edad);


    //edad negativa//
    if (edad < 0) {

        alert("La edad no puede ser negativa");

        return;

    }


    //edad maxima//
    if (edad > 100) {

        alert("La edad no puede superar 100 años");

        return;

    }


    //documento solo numeros//
    if (!/^[0-9]+$/.test(numeroDocumento)) {

        alert("El documento solo permite números");

        return;

    }


    //documento minimo//
    if (numeroDocumento.length < 3) {

        alert("El documento debe tener mínimo 3 dígitos");

        return;

    }


    //documento maximo//
    if (numeroDocumento.length > 18) {

        alert("El documento no puede superar 18 dígitos");

        return;

    }


    //validar edad//
    if (!validarUsuario()) {

        return;

    }


    //ocultar formulario datos generales//
    formsdatosGenerales.classList.add("oculto");


    //mostrar formulario salario//
    formularioSalario.classList.remove("oculto");

});



//segundo formulario//
formularioSalario.addEventListener("submit", function(event) {

    //evita recargar//
    event.preventDefault();


    //capturar datos//
    salario =
    Number(document.getElementById("salario").value);

    comisiones =
    Number(document.getElementById("comisiones").value);

    totalhorasExtra =
    Number(document.getElementById("horasExtra").value);

    niveldeRiesgo =
    Number(document.getElementById("riesgo").value);


    //salario obligatorio//
    if (isNaN(salario)) {

        alert("El salario debe estar en números");

        return;

    }


    //salario negativo//
    if (salario <= 0) {

        alert("El salario debe ser positivo");

        return;

    }


    //salario minimo//
    if (salario < 1750905) {

        alert("El salario mínimo permitido es 1.750.905");

        return;

    }


    //salario maximo//
    if (salario > 60000000) {

        alert("El salario no puede superar 60.000.000");

        return;

    }


    //comisiones negativas//
    if (comisiones < 0) {

        alert("Las comisiones deben ser positivas");

        return;

    }


    //horas extra negativas//
    if (totalhorasExtra < 0) {

        alert("Las horas extra no pueden ser negativas");

        return;

    }


    //riesgo obligatorio//
    if (isNaN(niveldeRiesgo) || niveldeRiesgo === 0) {

        alert("Seleccione un nivel de riesgo");

        return;

    }


    //punto4//
    let salarioTotal =

    salario +

    comisiones +

    totalhorasExtra;


    let calculoIbc =

    salarioTotal * 0.7;


    let auxilioTransporte = 0;


    if (salario <= (salariominimolegalVigente * 2)) {

        auxilioTransporte =
        subsidiodeTrasporte;

    }


    let valorSalud =

    calculoIbc * psalud;


    let valorPension =

    calculoIbc * pension;


    let fondoSolidaridad = 0;


    if (calculoIbc >= (salariominimolegalVigente * 4)) {

        fondoSolidaridad =

        calculoIbc *

        fondodesolidaridadPensonal;

    }


    //retencion//
    let ingresoGravado =

    calculoIbc -

    (valorSalud + valorPension);


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

    )

    `;


    //ocultar formulario salario//
    formularioSalario.classList.add("oculto");


    //mostrar resultados//
    document
    .getElementById("resultados")
    .classList.remove("oculto");


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