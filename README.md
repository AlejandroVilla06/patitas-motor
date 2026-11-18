# Patitas Motor

Clinical records engine for Patitas veterinary clinic, built with linked lists in Node.js as part of Riwi's Algoritmia 2 track.

## Quick start

```bash
# Run the clinical report (3 pets, costs, last vaccination)
node src/reporte.js

# Run tests
node pruebas/nodos.js        # Manual node linking
node pruebas/lista.js        # LinkedList insertion (6 cases)
node pruebas/casos-borde.js  # Search, insert, delete edge cases
```

## Structure

```
patitas-motor/
├── src/
│   ├── Nodo.js              # Node class (dato + siguiente)
│   ├── ListaEnlazada.js     # LinkedList (head/tail, O(1) insert)
│   ├── RegistroClinico.js   # Map-based multi-pet registry
│   └── reporte.js           # Clinical report with totals
├── pruebas/
│   ├── nodos.js             # MR1: manual linking + broken link
│   ├── lista.js             # MR2: 6 insertion test cases
│   └── casos-borde.js       # MR3: 6 edge cases (delete/search)
├── bitacora.md              # Development log & diagrams
└── README.md
```

## Techniques

| Concept | Where |
|---------|-------|
| Singly linked list | `Nodo.js`, `ListaEnlazada.js` |
| O(1) head/tail insertion | `agregarAlInicio`, `agregarAlFinal` |
| Conditional search | `buscar(condicion)` |
| Insert after condition | `insertarDespuesDe(condicion, dato)` |
| Delete with prev tracking | `eliminar(condicion)` |
| Composition (class uses class) | `RegistroClinico` uses `ListaEnlazada` |
| Map as index | `historiales = new Map()` |
