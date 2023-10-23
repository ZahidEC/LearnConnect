const preguntas = []; // Arreglo para almacenar las preguntas del cuestionario

document.getElementById('agregar-pregunta').addEventListener('click', () => {
  const pregunta = document.getElementById('pregunta').value;
  const opcionA = document.getElementById('opcion-a').value;
  const opcionB = document.getElementById('opcion-b').value;
  const opcionC = document.getElementById('opcion-c').value;
  const respuestaCorrecta = document.getElementById('respuesta-correcta').value;

  const nuevaPregunta = {
    pregunta,
    opciones: [opcionA, opcionB, opcionC],
    respuestaCorrecta
  };

  preguntas.push(nuevaPregunta);

  // Limpiar el formulario o realizar otras acciones según tus necesidades

  document.getElementById('pregunta').value = '';
  document.getElementById('opcion-a').value = '';
  document.getElementById('opcion-b').value = '';
  document.getElementById('opcion-c').value = '';
  document.getElementById('respuesta-correcta').value = '';
});

