//variables
let name = 'riwi'; //manera moderna de declarar una variable, usarlo si se quiere modificar mas adelante
var nombre = 'riwi' //manera antigua de declarar variables (obsoleta)
const year = 2025; //usar cuando el valor permanecera igual

let namem = "josesito", company = "riwi", año = 2026; //declarar varias vareables

/*
declaracion de comentarios largos 
*/

//bolean
let hazCompletadoModulo = false;
console.log(hazCompletadoModulo);

//undefined
let value;
console.log(value);

//bucles
for (initializacion; condicion; increment;){
    //code block to be repae
}
//incremento 
for (let i = 0; i < 5; i++) {
  console.log("Valor de i:", i);
}
//bucle while
let i=0

// Condición: Mientras la variable contador sea menor de 5
while (i < 5){
    console.log("valor de i :", i);
    i=i+1;
}

//condicionales
let nota = 7;
console.log("he realizado mi examen. ");

//condicion(si la nota es mayor a 5 )
if(nota > 5){
    console.log("Estoy aprobado!! ");
}

//ejemplo 1.
let Not = 7;
console.log("He realizado mi examen. Mi Resultado es el siguiente: ");

if(nota < 5){
    //accion A: Nota es menor que 5
    calificacion = "suspendido";
}else {
    //Accion B: cuelquiera otro caso difernte a el A (NOta mayor o igual 5)
    calificacion = "aprobado";
}
console.log("Estoy", calificacion);
/////////////////////////////////////////

//ejemplo 2 (varias condiciones)
let Nota = 7;
console.log("He realizado mi examen.");

// Condición
if (Nota < 5) {
  calificacion = "Insuficiente";
} else if (Nota < 6) {
  calificación = "Suficiente";
} else if (Nota < 8) {
  calificacion = "Bien";
} else if (Nota <= 9) {
  calificacion = "Notable";
} else {
  calificacion = "Sobresaliente";
}

console.log("He obtenido un", calificacion);


//Forma compacta de una condicion
let ages = 18;
let estado = (ages >= 18)? 'adulto' : 'menor';
console.log(estado);

//para varias condiciones 
let agess = 12;

let estados = (agess >= 18) ? 'adulto' : 
             (agess >= 13) ? 'adolescente' : 
             'niño';

console.log(estados);


let user = "joseph"

switch(user){
    case "joseph":
        alert("hola")
        break;
}

/* 
(query params) 

URL + PARAMS

(? = VARIABLES QUE SE PUEDEN PASAR EN UNA URL)

HTTPS://: RIWI.IO?NAME:JOSEPH

*/