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

 formsdatosGenerales.addEventListener("submit", function (e) { e.preventDefault(); 
    

 //if y else//

 if (edad < 18) { 
    //no se calcula//
   };

 if (edad >= 18 && edad <= 25 ){
     //no se calula pq no es beneficiario//                      
     };

 if (edad >= 25 && edad <= 60 ){ 
    //se calculan obligaciones bligaciones// 
    };

    edad >60 ? pension: false;

    //Capturar datos//
    nombreCompleto = document.getElementById("nombreCompleto").value;
    edad = document.getElementById("edad").value;
    tipodeDocumento = document.getElementById("tipodeDocumento").value; 
    numerodeDocumento = document.getElementById("numerodeDocumento").value;
    salario = document.getElementById("salario").value;
    comisiones = document.getElementById("comisiones").value;
    totalhorasExtra = document.getElementById("totalhorasExtra").value; 
    niveldeRiesgo = document.getElementById("niveldeRiesgo").value; 
    console.log(nombreCompleto, edad, tipodeDocumento, numerodeDocumento, salario, comisiones, totalhorasExtra, niveldeRiesgo);

    //punto4//
   
   let ibc = (salario + comisiones + totalHorasExtras) * 0.7
   let calculoAuxilioTransporte = salario < 2 * salarioMinimo? auxilioTransporte : 0
   let calculoSalud = ibc * porcentajeSalud
   let calculoFondoSolidaridad = ibc * porcentajeFondoSolidaridad
   let calculoPension = ibc >= 4 * salarioMinimo? ibc * porcentajePension + calculoFondoSolidaridad : ibc * porcentajePension
   let calculoArl = ibc * riesgos[parseInt(nivelRiesgo) - 1]; 