/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = []
  this.ultimoId = 0;
  this.cargar();

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.sumarVoto = new Evento(this);
  this.editarUnaPregunta  = new Evento(this);
  this.agregarUnaRespuesta = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if(this.preguntas.length == 0){
        return -1;
    }else{
    return  Math.max(... this.preguntas.map(pregunta => pregunta.id));
    }
   },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {

    var id = this.obtenerUltimoId();
    console.log(id);

    id++;
    console.log(id);
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

 
  //se borra una pregunta dado su id
  borrarPregunta : function(id){
    var preguntasActulizadas = []
    this.preguntas.forEach(pregunta => {
         if (!(pregunta.id == id)){
              preguntasActulizadas.push(pregunta);
         }
    });
    this.preguntas = preguntasActulizadas;
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  //Borrar todas las preguntas 
  borrarTodasLasPreguntas : function(){
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();
  },

  agregarVoto : function(pregunta, respuestaSelec){
      for (var i = 0; i < this.preguntas[pregunta.id].cantidadPorRespuesta.length; i++) {
          if (pregunta.cantidadPorRespuesta[i].textoRespuesta == respuestaSelec) {
            pregunta.cantidadPorRespuesta[i].cantidad++;
           }
        }
        
       this.guardar();
       this.sumarVoto.notificar(); 
       
    },

  obtenerPregunta : function(nombrePregunta){
      for ( var i = 0 ; i < this.preguntas.length ; i++ ){
            var preg ;
            if  (nombrePregunta == this.preguntas[i].textoPregunta ){
                preg = this.preguntas[i];
            }
      }
      return preg;
  },  
  
  
  editarPregunta : function(id,texto){
          this.preguntas[id].textoPregunta = texto ;   
          this.guardar();
          this.editarUnaPregunta.notificar(); 
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas))
  },

  cargar : function(){
    if (localStorage.getItem('preguntas')== null){
      
         localStorage.setItem('preguntas', JSON.stringify());
    }
    else{ 
           this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    };  
  }
};
