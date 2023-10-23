"use strict";

/* Tarea
 * Objetivos: adquirir herramientas y poner
 * en práctica lo visto en clase
 */

/* Enunciado
    --> Leer el README para ver el enunciado
*/

const boton = document.querySelector("#btnConsultar");

boton.onclick = async () => {

    const personaje = document.querySelector("#personaje").value;
    if (personaje == "") {
        alert("Indique un personaje para realizar la consulta");
        return;
    }

    // Enunciado: Tome esos datos y dentro del evento consulte los datos del personaje con la API mediante fetch.
    // Constantes necesarias para hacer un fetch (url, respuesta y logica con la respuesta)
    const url = `https://rickandmortyapi.com/api/character/?name=${personaje}`
    const respuesta = await fetch(url)

    // Enunciado: Capture los datos del personaje en un JSON e imprimalos en consola.
    if (respuesta.ok) {
        const data = await respuesta.json();
        console.log(data.results[0].name);

        const urlCapit = data.results[0].episode[0]; // Puedo definir la const como 'url' o hay conflicto?
        const respUrlCapit = await fetch(urlCapit);
        const primeraAparicion =await respUrlCapit.json();

        let accumulator =
            `
            <img src="${data.results[0].image}" alt="Imagen Rick & Morty" class="img-rounded"><br><br>
            <h4>${data.results[0].name} <small>${data.results[0].species} - ${data.results[0].status}</small></h4><br>
            <h4>Ultima ubicación conocida: <small>${data.results[0].origin.name}</small></h4><br>
            <h4>Primera aparición: <small>${primeraAparicion.name}</small></h4>
            `;

        const seccionHtml = document.querySelector("#html-respuesta");
        seccionHtml.innerHTML = accumulator;
    } else {
        alert("Algo no salio bien...");
        const data = await respuesta.json();
        console.log(data.error);
    }

}