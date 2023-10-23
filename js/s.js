document.addEventListener('DOMContentLoaded', () => {
    const opciones = document.querySelectorAll('.opcion');

    opciones.forEach(opcion => {
        opcion.addEventListener('click', () => {
            opciones.forEach(opcion => opcion.classList.remove('opcion-activa'));
            opcion.classList.add('opcion-activa');

            const contenido = document.querySelector('.contenido');
            contenido.innerHTML = `
                <h2>Contenido principal</h2>
                <p>Este es el contenido principal correspondiente a la opción ${opcion.textContent}.</p>
            `;
        });
    });
});