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


// evento
console.log("AQUI");


//funcion validar usuario//
function validarUsuario() {

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



//primer formulario//
formsdatosGenerales.addEventListener("submit", function(event) {

    //evita recargar//
    event.preventDefault();


    //Capturar datos//
    nombreCompleto =
    document.getElementById("nombre").value;

    edad =
    Number(document.getElementById("edad").value);

    tipoDocumento =
    document.getElementById("tipoDocumento").value;

    numeroDocumento =
    document.getElementById("numeroDocumento").value;


    //Validacion//
    if (

        nombreCompleto === "" ||

        edad === "" ||

        tipoDocumento === "" ||

        numeroDocumento === ""

    ) {

        alert("Por favor complete todos los campos");

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


    //Capturar datos//
    salario =
    Number(document.getElementById("salario").value);

    comisiones =
    Number(document.getElementById("comisiones").value);

    totalhorasExtra =
    Number(document.getElementById("horasExtra").value);

    niveldeRiesgo =
    Number(document.getElementById("riesgo").value);


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



    //aporcentaje de riesgo//

    let arl =

    calculoIbc * niveldeRiesgo;



    //Total//

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


    let pTotal =

    (total / totalGrafica) * 100;



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