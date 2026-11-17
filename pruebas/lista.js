const ListaEnlazada = require('../src/ListaEnlazada');

function verificar(lista, nombre, esperado) {
  const datos = lista.aArreglo();
  const ok = JSON.stringify(datos) === JSON.stringify(esperado);
  const cabezaDato = lista.cabeza ? lista.cabeza.dato : null;
  const colaDato = lista.cola ? lista.cola.dato : null;

  console.log(`\n${nombre}`);
  console.log(`  Datos:   [${datos.join(', ')}]`);
  console.log(`  Cabeza:  ${cabezaDato}`);
  console.log(`  Cola:    ${colaDato}`);
  console.log(`  Tamaño:  ${lista.obtenerTamanio()}`);
  console.log(`  Vacía:   ${lista.estaVacia()}`);
  console.log(`  ¿Correcto?: ${ok ? '✓ SÍ' : '✗ NO'}`);

  if (lista.obtenerTamanio() === 1 && lista.cabeza !== lista.cola) {
    console.log('  ✗ ERROR: Con 1 nodo, cabeza y cola deberían ser el mismo');
  }

  let conteo = 0;
  let actual = lista.cabeza;
  while (actual) { conteo++; actual = actual.siguiente; }
  if (conteo !== lista.obtenerTamanio()) {
    console.log(`  ✗ ERROR: tamanio=${lista.obtenerTamanio()} pero hay ${conteo} nodos reales`);
  }
}

const lista = new ListaEnlazada();
verificar(lista, 'CASO 1: Lista vacía', []);

lista.agregarAlFinal('A');
verificar(lista, 'CASO 2: agregarAlFinal en vacía → [A]', ['A']);

lista.agregarAlFinal('B');
verificar(lista, 'CASO 3: agregarAlFinal con 1 nodo → [A, B]', ['A', 'B']);

lista.agregarAlFinal('C');
verificar(lista, 'CASO 4: agregarAlFinal con varios → [A, B, C]', ['A', 'B', 'C']);

lista.agregarAlInicio('Z');
verificar(lista, 'CASO 5: agregarAlInicio con varios → [Z, A, B, C]', ['Z', 'A', 'B', 'C']);

const lista2 = new ListaEnlazada();
lista2.agregarAlInicio('X');
verificar(lista2, 'CASO 6: agregarAlInicio en vacía → [X]', ['X']);

console.log('\n=== recorrer(callback) ===');
console.log('  Recorrido:');
lista.recorrer((dato) => console.log(`    → ${dato}`));
