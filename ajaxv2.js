var READY_STATE_UNINITIALIZED = 0;
var READY_STATE_LOADING = 1;
var READY_STATE_LOADED = 2;
var READY_STATE_INTERACTIVE = 3;
var READY_STATE_COMPLETE = 4;
var peticion_http;

function cargaContenido(url, metodo, funcion) {
    peticion_http = inicializa_xhr();
    if(peticion_http) {
        peticion_http.onreadystatechange = funcion;
        peticion_http.open(metodo, url, true);
        peticion_http.send();
    }
}

// Encapsulamos la creación del objeto XMLHttpRequest
function inicializa_xhr() {
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
}

function muestraContenido() {
    if(peticion_http.readyState == READY_STATE_COMPLETE) {
        if(peticion_http.status == 200) {
            var datos = JSON.parse(peticion_http.responseText);
            let ul = document.getElementById('listado');
            for (var i=0;i<datos.data.length;i++) {
                console.log(datos.data[i].first_name);
                li = document.createElement('li');
                txt = document.createTextNode(datos.data[i].first_name);
                li.appendChild(txt);
                ul.appendChild(li);
            }
        }
    }
}

function descargaDatos() {
    cargaContenido('https://reqres.in/api/users', 'GET', muestraContenido);
}
window.onload = function() {
    let boton = document.getElementById('boton');
    boton.addEventListener('click', descargaDatos);

}
