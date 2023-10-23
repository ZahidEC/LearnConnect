const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});


document.querySelector('form[name="registrationForm"]').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const rol = document.querySelector('input[name="rol"]:checked').value; // Obtiene el valor del boton
  
  // registro de Firebase
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Exito en el registro
      const user = userCredential.user;
      console.log('Usuario registrado:', user);
      // guardar el rol en Firebase Database 
    })
    .catch((error) => {
      // Maneja los errores de registro
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error de registro:', errorCode, errorMessage);
    });
});
