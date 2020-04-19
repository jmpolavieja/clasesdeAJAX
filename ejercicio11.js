var READY_STATE_UNINITIALIZED = 0;
var READY_STATE_LOADING = 1;
var READY_STATE_LOADED = 2;
var READY_STATE_INTERACTIVE = 3;
var READY_STATE_COMPLETE = 4;
var peticion_http;
var tiempoInicial = 0;


function cargaContenido(url, metodo, funcion) {

    peticion_http = inicializa_xhr();
    if(peticion_http) {
        peticion_http.onreadystatechange = funcion;
        tiempoInicial = new Date();
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

function actualizaEstado() {
    var timepoFinal = new Date();
    var milisegundos = timepoFinal - tiempoInicial;

    let estados = document.getElementById('estados');
    if(estados.innerHTML) {
        estados.innerHTML += "[" + milisegundos + " mseg.]" + peticion_http.readyState + '<br>';
    }else{
        estados.innerHTML = "[" + milisegundos + " mseg.]" + peticion_http.readyState + '<br>';
    }

}

function muestraCabeceras() {
    var cabeceras = document.getElementById('cabeceras');
    cabeceras.innerHTML += peticion_http.getAllResponseHeaders();
}

function muestraCodigoEstado() {
    var codigo = document.getElementById('codigo');
    codigo.innerHTML += peticion_http.status + ': ' + peticion_http.statusText + "<br>";
}

function muestraContenido() {
    actualizaEstado();

    if(peticion_http.readyState == READY_STATE_COMPLETE) {
        if(peticion_http.status == 200) {
            var datos = JSON.parse(peticion_http.responseText);
            let contenidos = document.getElementById('contenidos');
            var texto = '';
            for(let i in datos.data){
                for(let x in datos.data[i]){
                    texto += datos.data[i][x] + '<br>';
                }
            }
            contenidos.innerHTML = texto;
        }
        muestraCabeceras();
        muestraCodigoEstado();
    }
}

function descargaDatos() {
    if(recurso.value == window.location || recurso.value == ''){
        alert('Debe introducir la URL para la petición AJAX.');
        recurso.value = '';
        recurso.focus();
    } else {
        document.getElementById('contenidos').innerText = '';
        document.getElementById('estados').innerText = '';
        cargaContenido(recurso.value, 'GET', muestraContenido);
    }
}

window.onload = function () {
    recurso = document.getElementById('recurso');
    recurso.value = location.href;
    var button = document.getElementById('enviar');
    button.addEventListener('click', descargaDatos);

}
