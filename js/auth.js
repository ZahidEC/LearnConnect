// Inicializar TinyMCE en el campo de descripción
tinymce.init({
    selector: '#descripcion',
    plugins: 'autolink lists link image charmap print preview',
    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    menubar: false
  });