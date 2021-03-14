// Campos del usuario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI  userInterface
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas {
    constructor(){
        this.citas = [];
    }
}

class UI {

    imprimirAlerta(mensaje, tipo){
        // Creamos el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Mensaje de acuerdo al tipo de error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar la alerta
        setTimeout(() => {
            divMensaje.remove();
        }, 1500);
    }
}

const ui = new UI();
const administrarCitas = new Citas();

// Registrar Eventos
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// Objeto con la información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// Agrega datos al Obj de cita
function datosCita(e){
    // Para que funcione hay que definir un name con el mismo nombre que las propiedades del Obj
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}

// Valida y agrega una cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    if(mascota === ''  ||  propietario === '' ||  telefono === ''  ||  fecha === ''  ||  hora === ''  ||  sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
    }
}