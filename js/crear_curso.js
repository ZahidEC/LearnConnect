// Escucha el envío del formulario
const cursoForm = document.getElementById('curso-form');
const preguntasContainer = document.getElementById('preguntas-container');
const agregarPreguntaButton = document.getElementById('agregar-pregunta');

cursoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const nombre = cursoForm.nombre.value;
    const descripcion = cursoForm.descripcion.value;
    const imagenes = cursoForm.imagenes.files;
    const videos = cursoForm.videos.files;
    const texto = cursoForm.texto.value;
    const capitulos = cursoForm.capitulos.value;

    // Procesar los datos, almacenar en Firebase, etc.
  
});

// Agregar preguntas
let preguntaCount = 0;

agregarPreguntaButton.addEventListener('click', () => {
    preguntaCount++;

    const preguntaDiv = document.createElement('div');
    preguntaDiv.className = 'pregunta';

    preguntaDiv.innerHTML = `
        <label for="pregunta${preguntaCount}">Pregunta:</label>
        <input type="text" name="pregunta${preguntaCount}" required>
        <label for="respuesta${preguntaCount}_1">Respuesta 1:</label>
        <input type="text" name="respuesta${preguntaCount}_1" required>
        <label for="respuesta${preguntaCount}_2">Respuesta 2:</label>
        <input type="text" name="respuesta${preguntaCount}_2" required>
        <label for="respuesta${preguntaCount}_3">Respuesta 3:</label>
        <input type="text" name="respuesta${preguntaCount}_3" required>
        <label for="correcta${preguntaCount}">Respuesta Correcta:</label>
        <select name="correcta${preguntaCount}">
            <option value="1">Respuesta 1</option>
            <option value="2">Respuesta 2</option>
            <option value="3">Respuesta 3</option>
        </select>
    `;

    preguntasContainer.appendChild(preguntaDiv);
});
