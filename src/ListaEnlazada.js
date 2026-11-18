const Nodo = require('./Nodo');

class ListaEnlazada {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.tamanio = 0;
  }

  agregarAlFinal(dato) {
    const nuevo = new Nodo(dato);
    if (!this.cabeza) this.cabeza = nuevo;
    else this.cola.siguiente = nuevo;
    this.cola = nuevo;
    this.tamanio++;
  }

  agregarAlInicio(dato) {
    const nuevo = new Nodo(dato);
    nuevo.siguiente = this.cabeza;
    this.cabeza = nuevo;
    if (!this.cola) this.cola = nuevo;
    this.tamanio++;
  }

  recorrer(callback) {
    let actual = this.cabeza;
    while (actual) {
      callback(actual.dato);
      actual = actual.siguiente;
    }
  }

  aArreglo() {
    const datos = [];
    let actual = this.cabeza;
    while (actual) {
      datos.push(actual.dato);
      actual = actual.siguiente;
    }
    return datos;
  }

  buscar(condicion) {
    let actual = this.cabeza;
    while (actual) {
      if (condicion(actual.dato)) return actual.dato;
      actual = actual.siguiente;
    }
    return null;
  }

  insertarDespuesDe(condicion, dato) {
    let actual = this.cabeza;
    while (actual) {
      if (condicion(actual.dato)) {
        const nuevo = new Nodo(dato);
        nuevo.siguiente = actual.siguiente;
        actual.siguiente = nuevo;
        if (actual === this.cola) this.cola = nuevo;
        this.tamanio++;
        return true;
      }
      actual = actual.siguiente;
    }
    return false;
  }

  eliminar(condicion) {
    if (!this.cabeza) return null;

    if (condicion(this.cabeza.dato)) {
      const dato = this.cabeza.dato;
      this.cabeza = this.cabeza.siguiente;
      if (!this.cabeza) this.cola = null;
      this.tamanio--;
      return dato;
    }

    let anterior = this.cabeza;
    while (anterior.siguiente) {
      if (condicion(anterior.siguiente.dato)) {
        const dato = anterior.siguiente.dato;
        anterior.siguiente = anterior.siguiente.siguiente;
        if (!anterior.siguiente) this.cola = anterior;
        this.tamanio--;
        return dato;
      }
      anterior = anterior.siguiente;
    }
    return null;
  }

  estaVacia() {
    return this.tamanio === 0;
  }

  obtenerTamanio() {
    return this.tamanio;
  }
}

module.exports = ListaEnlazada;
