//Datos de usuario//
//  //punto1//
 let nombreCompleto = "";
 let edad = ""; 
 let tipodeDocumento = ""; 
 let numerodeDocumento = "";

 //punto3//
 let salario = "";
 let comisiones = "";
 let totalhorasExtra = ""; 
 let niveldeRiesgo= "";

 //formulario// 
 const formsdatosGenerales= document.getElementById("datosGenerales");

 //constantes//
 const salariominimolegalVigente = 1750905 ; 
 const salariominimointegralVigente = 22761765;
 const subsidiodeTrasporte = 249095; 
 const uvT = 52.37; 
 const psalud = 0.04; 
 const pension = 0.04;
 const fondodesolidaridadPensonal=0.01;

 //riesgos//
 const riego1= 0.522; 
 const riego2= 1.044; 
 const riego3= 2.436; 
 const riego4= 4.350; 
 const riego5= 6.960;

 // evento
 console.log("AQUI");
 
    formsdatosGenerales.addEventListener("submit", function(event) {

    
    //Capturar datos//
    nombreCompleto = document.getElementById("nombreCompleto").value;
    console.log("nombreCompleto"+nombreCompleto);
    edad = document.getElementById("edad").value;
    tipodeDocumento = document.getElementById("tipodeDocumento").value; 
    numerodeDocumento = document.getElementById("numerodeDocumento").value;
    salario = document.getElementById("salario").value;
    comisiones = document.getElementById("comisiones").value;
    totalhorasExtra = document.getElementById("totalhorasExtra").value; 
    niveldeRiesgo = document.getElementById("niveldeRiesgo").value; 
    console.log(nombreCompleto, edad, tipodeDocumento, numerodeDocumento, salario, comisiones, totalhorasExtra, niveldeRiesgo);


    
    //punto4//
   
    let salarioTotal = salario + comisiones + totalhorasExtra;

    let calculoIbc = salarioTotal * 0.7;

    let auxilioTransporte = 0;
    if (salario <= (salariominimolegalVigente * 2)) {
        auxilioTransporte = subsidiodeTrasporte;
    }

    let valorSalud = calculoIbc * psalud;
    let valorPension = calculoIbc * pension;

    let fondoSolidaridad = 0;
    if (calculoIbc >= (salariominimolegalVigente * 4)) {
        fondoSolidaridad = calculoIbc * fondodesolidaridadPensonal;
    }

   // retencion//

    let ingresoGravado = calculoIbc - (valorSalud + valorPension);
    let ingresoUVT = ingresoGravado / uvT;

    let retencionUVT = 0;

    if (ingresoUVT <= 95) {
        retencionUVT = 0;
    } else if (ingresoUVT <= 150) {
        retencionUVT = (ingresoUVT - 95) * 0.19;
    } else if (ingresoUVT <= 360) {
        retencionUVT = (ingresoUVT - 150) * 0.28 + 10;
    } else if (ingresoUVT <= 640) {
        retencionUVT = (ingresoUVT - 360) * 0.33 + 69;
    } else if (ingresoUVT <= 945) {
        retencionUVT = (ingresoUVT - 640) * 0.35 + 162;
    } else if (ingresoUVT <= 2300) {
        retencionUVT = (ingresoUVT - 945) * 0.37 + 268;
    } else {
        retencionUVT = (ingresoUVT - 2300) * 0.39 + 770;
    }

    let retencion = retencionUVT * uvT;

     // aporcentaje de riesgo//

    let porcentajeRiesgo = 0;

    switch (niveldeRiesgo) {
        case 1: porcentajeRiesgo = riego1; break;
        case 2: porcentajeRiesgo = riego2; break;
        case 3: porcentajeRiesgo = riego3; break;
        case 4: porcentajeRiesgo = riego4; break;
        case 5: porcentajeRiesgo = riego5; break;
        default:
            alert("Riesgo inválido");
            return;
    }
     let arl = calculoIbc * porcentajeRiesgo;

     //Total//
     let deducciones = valorSalud + valorPension + fondoSolidaridad + arl + retencion;

     let total = salarioTotal + auxilioTransporte - deducciones;
     //Resultados//

     document.getElementById("contenidoResultados").innerHTML = `
     <p><strong>Salario:</strong> $${salario.toLocaleString()}</p>
     <p><strong>IBC:</strong> $${calculoIbc.toLocaleString()}</p>
     <p><strong>Salud:</strong> $${valorSalud.toLocaleString()}</p>
     <p><strong>Pensión:</strong> $${valorPension.toLocaleString()}</p>
     <p><strong>ARL:</strong> $${arl.toLocaleString()}</p>
     <p><strong>Retención en la fuente:</strong> $${retencion.toLocaleString()}</p>
     <p><strong>Total final:</strong> $${total.toLocaleString()}</p>
`;

    });