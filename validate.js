const formulario = document.getElementById('carnetForm');
const btnGenerarCarnet = document.getElementById('btn-generar-carnet');
const inputs = document.querySelectorAll('#carnetForm input');

// Función para validar la imagen
function validateImage(imageInput) {
    // Verificar si se seleccionó una imagen
    if (imageInput.files.length === 0) {
        alert('Por favor, seleccione una imagen.');
        return false;
    }

    return true;
}


const expresiones = {
    nombre: /^[a-zA-Z\s]{2,10}$/,
    apellido: /^[a-zA-Z\s]{2,10}$/,
    dni: /^.[0-9]{7}$/, // 8 dígitos.
    escuela: /^[a-zA-Z0-9\s]{2,11}$/,
}

const campos = {
    nombre: false,
    apellido: false,
    dni: false,
    escuela: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
        case "dni":
            validarCampo(expresiones.dni, e.target, 'dni');
            break;
        case "escuela":
            validarCampo(expresiones.escuela, e.target, 'escuela');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

btnGenerarCarnet.addEventListener('click', () => {
  // Verifica si todos los campos son válidos antes de generar el carné
  if (campos.nombre && campos.apellido && campos.dni && campos.escuela) {
      btnGenerarCarnet.disabled = true;
      formulario.reset();
      document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
      setTimeout(() => {
          document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
          btnGenerarCarnet.disabled = false;
      }, 1800000); // 30 minutos
  } else {
      document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
      // Aquí puedes agregar un mensaje adicional o realizar alguna acción para indicar que hay errores.
      alert("Por favor, completa todos los campos correctamente.");
  }
});


