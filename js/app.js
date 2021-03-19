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

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id );
        
        console.log(this.citas);
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

    imprimirCitas({citas}){ // hacemos el destruction directamente desde los argumentos

        limpiarHTML();
        
        citas.forEach( cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="dont-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="dont-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="dont-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="dont-weight-bolder">hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="dont-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            // Boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

            btnEliminar.onclick = () => eliminarCita(id);

            // Agregar los parrafos a divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);

            // Agregar divCita al HTML
            contenedorCitas.appendChild(divCita);
        });
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
}

// Valida y agrega una cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    if(mascota === ''  ||  propietario === '' ||  telefono === ''  ||  fecha === ''  ||  hora === ''  ||  sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    // Generar id único
    citaObj.id = Date.now();

    // Creando una nueva cita
    // no hay que pasar el objeto, sino una copia, caso contrario estariamos pasando la referencia al obj
    administrarCitas.agregarCita( {...citaObj} );

    formulario.reset();

    // reiniciar objeto
    reiniciarObj();

    // Mostrar el HTML con las citas
    ui.imprimirCitas(administrarCitas);

}

function reiniciarObj(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function limpiarHTML(){
    while(contenedorCitas.firstChild){
        contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
}

function eliminarCita(id){

    // Eliminar cita
    administrarCitas.eliminarCita(id);

    // Mostrar mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente', 'error');

    // Actualizar HTML
    ui.imprimirCitas(administrarCitas);
}