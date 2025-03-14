//interfaz que define metodos CRUD STANDARD sirve como
//contrato para asegurar cualquier clase que implemente 
// la interfaz con estos metodos
class IRepository {
    obtenerPorId(id) {
      throw new Error("Método 'obtenerPorId()' no implementado");
    }
  
    obtenerTodos() {
      throw new Error("Método 'obtenerTodos()' no implementado");
    }
  
    buscarPorAtributo(atributo, valor) {
      throw new Error("Método 'buscarPorAtributo()' no implementado");
    }
  
    obtenerMayoresDe30() {
      throw new Error("Método 'obtenerMayoresDe30()' no implementado");
    }
    // segundo paso definir metodo para actualizar
    actualizarPorId(id) {
      throw new Error("Método 'actualizarPorId()' no");
    }
  }

  export default IRepository;