# Bitácora — Motor Patitas

## MiniReto 1: La consulta cero — el repositorio y el nodo

### Diagrama de nodos y flechas

```
 cabeza
   │
   ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│ nodo1   │     │ nodo2   │     │ nodo3   │
│ 02/02   │────▶│ 15/03   │────▶│ 20/05   │────▶ null
│ Vacuna  │     │ Control │     │ Dental  │
│ $85.000 │     │ $40.000 │     │$150.000 │
└─────────┘     └─────────┘     └─────────┘
```

Cada nodo tiene dos propiedades:
- `dato`: el objeto de la atención (fecha, motivo, veterinario, costo)
- `siguiente`: referencia al próximo nodo (o `null` si es el último)

### Enlace perdido: ¿qué pasa si `nodo1.siguiente = null`?

```
 cabeza
   │
   ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│ nodo1   │     │ nodo2   │     │ nodo3   │
│ 02/02   │──▶ null   │ 15/03   │────▶│ 20/05   │────▶ null
│ Vacuna  │     │ Control │     │ Dental  │
└─────────┘     └─────────┘     └─────────┘
                 ↑ inalcanzable desde cabeza
```

Al asignar `nodo1.siguiente = null`, el recorrido desde `cabeza` solo encuentra el primer nodo y se detiene. Los nodos 2 y 3 **siguen existiendo en memoria** pero son **inalcanzables** desde la cabeza — como sacar una hoja de la carpeta: todo lo que viene después se pierde para el recorrido. Esta es exactamente la fragilidad que describía la directora de Patitas.
