const ListaEnlazada = require('../src/ListaEnlazada');

let errores = 0;

function verificar(lista, nombre, esperado) {
  const datos = lista.aArreglo();
  const ok = JSON.stringify(datos) === JSON.stringify(esperado);
  const cab = lista.cabeza ? lista.cabeza.dato : null;
  const col = lista.cola ? lista.cola.dato : null;
  const colSig = lista.cola ? lista.cola.siguiente : 'N/A';

  console.log(`\n${nombre}`);
  console.log(`  Datos:    [${datos.join(', ')}]`);
  console.log(`  Cabeza:   ${cab}`);
  console.log(`  Cola:     ${col}`);
  console.log(`  Cola.sig: ${colSig}`);
  console.log(`  Tamaño:   ${lista.obtenerTamanio()}`);

  if (!ok) { console.log('  ✗ DATOS INCORRECTOS'); errores++; }
  else console.log('  ✓ OK');

  if (lista.cola && lista.cola.siguiente !== null) {
    console.log('  ✗ ERROR: cola.siguiente no es null');
    errores++;
  }

  let conteo = 0;
  let actual = lista.cabeza;
  while (actual) { conteo++; actual = actual.siguiente; }
  if (conteo !== lista.obtenerTamanio()) {
    console.log(`  ✗ ERROR: tamanio=${lista.obtenerTamanio()} pero hay ${conteo} nodos`);
    errores++;
  }
}

const vacia = new ListaEnlazada();
const r1 = vacia.eliminar((d) => d === 'X');
console.log('\nCASO 1: Eliminar en lista vacía');
console.log(`  Resultado: ${r1}`);
console.log(`  ${r1 === null ? '✓ OK' : '✗ FALLÓ'}`);

const unica = new ListaEnlazada();
unica.agregarAlFinal('A');
unica.eliminar((d) => d === 'A');
verificar(unica, 'CASO 2: Eliminar el único nodo → []', []);

const lista3 = new ListaEnlazada();
lista3.agregarAlFinal('A');
lista3.agregarAlFinal('B');
lista3.agregarAlFinal('C');
lista3.eliminar((d) => d === 'A');
verificar(lista3, 'CASO 3: Eliminar la cabeza → [B, C]', ['B', 'C']);

const lista4 = new ListaEnlazada();
lista4.agregarAlFinal('A');
lista4.agregarAlFinal('B');
lista4.agregarAlFinal('C');
lista4.eliminar((d) => d === 'C');
verificar(lista4, 'CASO 4: Eliminar la cola → [A, B]', ['A', 'B']);

const lista5 = new ListaEnlazada();
lista5.agregarAlFinal('A');
lista5.agregarAlFinal('B');
const r5 = lista5.eliminar((d) => d === 'Z');
console.log(`\nCASO 5: Eliminar inexistente`);
console.log(`  Resultado: ${r5}`);
console.log(`  ${r5 === null ? '✓ OK devolvió null' : '✗ FALLÓ'}`);
verificar(lista5, '  Lista sin cambios → [A, B]', ['A', 'B']);

const lista6 = new ListaEnlazada();
lista6.agregarAlFinal('A');
lista6.agregarAlFinal('B');
lista6.insertarDespuesDe((d) => d === 'B', 'C');
verificar(lista6, 'CASO 6: insertarDespuesDe cola → [A, B, C]', ['A', 'B', 'C']);

console.log('\n=== buscar ===');
const listaB = new ListaEnlazada();
listaB.agregarAlFinal('Vacunación');
listaB.agregarAlFinal('Control');
listaB.agregarAlFinal('Dental');
const encontrado = listaB.buscar((d) => d.includes('Control'));
const noExiste = listaB.buscar((d) => d === 'Cirugía');
console.log(`  Buscar "Control": ${encontrado} ${encontrado === 'Control' ? '✓' : '✗'}`);
console.log(`  Buscar "Cirugía": ${noExiste} ${noExiste === null ? '✓' : '✗'}`);

console.log(`\n=== ${errores === 0 ? '✓ Todos los casos pasaron' : `✗ ${errores} errores`} ===`);
