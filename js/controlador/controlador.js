/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id){
      this.modelo.borrarPregunta(id);
  },

  borrarTodasLasPreguntas : function(){
      this.modelo.borrarTodasLasPreguntas();
  },

  

  agregarVoto : function(pregunta , respuestaSeleccionada){
      this.modelo.agregarVoto(pregunta, respuestaSeleccionada);

  },

  editarPregunta: function() {
    var id = parseInt($('.list-group-item.active').attr('id'));
    if (id != -1)
      var texto = prompt('Editar pregunta:', '');
    if (texto)
      this.modelo.editarPregunta(id,texto);
  },
};
