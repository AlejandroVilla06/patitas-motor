const Nodo = require('../src/Nodo');

const nodo1 = new Nodo({
  fecha: '02/02',
  motivo: 'Vacunación anual',
  veterinario: 'Dra. Ríos',
  costo: 85000,
});

const nodo2 = new Nodo({
  fecha: '15/03',
  motivo: 'Control de peso',
  veterinario: 'Dr. Gómez',
  costo: 40000,
});

const nodo3 = new Nodo({
  fecha: '20/05',
  motivo: 'Limpieza dental',
  veterinario: 'Dra. Ríos',
  costo: 150000,
});

nodo1.siguiente = nodo2;
nodo2.siguiente = nodo3;

const cabeza = nodo1;

console.log('=== Historial clínico de Lola ===\n');

let actual = cabeza;
while (actual !== null) {
  const a = actual.dato;
  console.log(`  ${a.fecha} | ${a.motivo} | ${a.veterinario} | $${a.costo.toLocaleString('es-CO')}`);
  actual = actual.siguiente;
}

let costoTotal = 0;
actual = cabeza;
while (actual !== null) {
  costoTotal += actual.dato.costo;
  actual = actual.siguiente;
}
console.log(`\n  Costo total: $${costoTotal.toLocaleString('es-CO')}`);

console.log('\n=== Simulación de enlace perdido ===\n');
nodo1.siguiente = null;

console.log('  Después de nodo1.siguiente = null:\n');
actual = cabeza;
let nodosAlcanzados = 0;
while (actual !== null) {
  console.log(`  ${actual.dato.fecha} | ${actual.dato.motivo}`);
  nodosAlcanzados++;
  actual = actual.siguiente;
}
console.log(`\n  Solo se alcanzaron ${nodosAlcanzados} de 3 nodos.`);
console.log('  Los nodos 2 y 3 siguen en memoria pero son inalcanzables desde cabeza.');
console.log('  El recorrido se detiene porque nodo1.siguiente es null.');
