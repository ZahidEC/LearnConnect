// Importa Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; // Importa Firestore

// Configura Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyB0mRTuZ66REMEgy9HMfLMTptzC2qDttbI',
  authDomain: 'learnconnect-3b990.firebaseapp.com',
  projectId: 'learnconnect-3b990',
  storageBucket: 'learnconnect-3b990.appspot.com',
  messagingSenderId: '842149122570',
  appId: '1:842149122570:web:0ae0fea240ebd7cbbb05f3',
  measurementId: 'G-FS9V4PXSNM',
};

firebase.initializeApp(firebaseConfig);

// Funciones relacionadas autenticación

function registrarUsuario(email, password, rol) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Almacena el rol en Firestore
      return firebase.firestore().collection('users').doc(user.uid).set({
        rol: rol
      })
      .then(() => {
        console.log('Usuario registrado con éxito y rol almacenado en Firestore.');
        return user; // Devuelve el usuario registrado
      });
    })
    .catch((error) => {
      console.error('Error al registrar usuario:', error);
      throw error;
    });
}

// Inicio de sesión de usuario y redirección según el rol
function iniciarSesion(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Consulta el campo "rol" del usuario en Firestore
      return firebase.firestore().collection('users').doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            const userType = userData.rol;

            if (userType === 'instructor') {
              window.location.href = 'panel_instructor.html';
            } else if (userType === 'estudiante') {
              window.location.href = 'panel_estudiante.html';
            }
          }
        })
        .catch((error) => {
          console.error('Error al consultar el campo "rol" en Firestore:', error);
        });
    })
    .catch((error) => {
      // Maneja los errores de inicio de sesión
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error de inicio de sesión:', errorCode, errorMessage);
    });
}

// Cierre de sesión de usuario
function cerrarSesion() {
  return firebase.auth().signOut();
}

export { registrarUsuario, iniciarSesion, cerrarSesion };

window.addEventListener('load', () => {
  cambiarColorFondoCursos();
});

// Referencia al formulario
const cursoForm = document.getElementById('curso-form');

// envío del formulario
cursoForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    // Obtiene los valores del formulario
    const nombre = cursoForm.nombre.value;
    const tipo = cursoForm.tipo.value;
    const categoria = cursoForm.categoria.value;
    const descripcion = cursoForm.descripcion.value;

    // Obtiene el ID del usuario autenticado 
    const userID = firebase.auth().currentUser.uid;

    // Accede a Firestore 
    const db = firebase.firestore();

    // Crea un documento para el curso en una colección "cursos"
    db.collection('cursos').add({
        nombre,
        tipo,
        categoria,
        descripcion,
        creador: userID, // Asocia el curso al usuario que lo creó
    })
    .then((docRef) => {
        console.log('Curso creado con ID:', docRef.id);
        alert('Curso creado con éxito');
        cursoForm.reset(); // Limpiador del el formulario después de crear el curso
    })
    .catch((error) => {
        console.error('Error al crear el curso:', error);
        alert('Hubo un error al crear el curso');
    });
});


// Escuchar el envío del formulario
const personalizarCursoForm = document.getElementById('personalizar-curso-form');

personalizarCursoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtener los valores del formulario
  const titulo = personalizarCursoForm.titulo.value;
  const descripcion = tinymce.get('descripcion').getContent();
  const video = personalizarCursoForm.video.files[0];
  const imagen = personalizarCursoForm.imagen.files[0];


  // subir una imagen a Firebase Storage:
  const storageRef = firebase.storage().ref();
  const imagenRef = storageRef.child('imagenes/' + imagen.name);
  imagenRef.put(imagen)
      .then((snapshot) => {
          console.log('Imagen subida con éxito.');
          // Guarda la URL de la imagen en la base de datos.
      })
      .catch((error) => {
          console.error('Error al subir la imagen:', error);
      });
});

// Guarda metadatos en Firebase Database
const db = firebase.firestore(); 

const cursoDoc = db.collection('cursos').doc(); // Genera un ID automático para el curso

// Objeto con los metadatos del curso
const cursoData = {
    titulo: titulo,
    descripcion: descripcion,
    // Otros campos de metadatos
    urlImagen: 'URL de la imagen en Firebase Storage',
    urlVideo: 'URL del video en Firebase Storage',
};

cursoDoc.set(cursoData)
    .then(() => {
        console.log('Metadatos del curso almacenados en Firebase Database.');
    })
    .catch((error) => {
        console.error('Error al almacenar los metadatos del curso:', error);
    });
    // Función para cambiar el color de fondo de los cursos al pasar el ratón
    function cambiarColorFondoCursos() {
    const cursos = document.querySelectorAll('.lista-cursos li');

    cursos.forEach(curso => {
    curso.addEventListener('mouseenter', () => {
      curso.style.backgroundColor = '#222';
    });

    curso.addEventListener('mouseleave', () => {
      curso.style.backgroundColor = '#111';
    });
  })
}