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

## MiniReto 2: El historial clínico como lista enlazada

### Diagramas previos: qué referencias cambian

#### agregarAlFinal en lista vacía

```
Antes:  cabeza → null, cola → null, tamanio = 0

Después:
  cabeza ──▶ ┌───┐ ◀── cola
              │ A │──▶ null
              └───┘
  tamanio = 1 (cabeza y cola son el mismo nodo)
```

#### agregarAlFinal en lista con 1 nodo

```
Antes:
  cabeza ──▶ ┌───┐ ◀── cola
              │ A │──▶ null
              └───┘

Después:
  cabeza ──▶ ┌───┐     ┌───┐ ◀── cola
              │ A │────▶│ B │──▶ null
              └───┘     └───┘
  tamanio = 2 (cola se mueve al nuevo)
```

#### agregarAlFinal en lista con varios

```
Antes:
  cabeza ──▶ ┌───┐     ┌───┐ ◀── cola
              │ A │────▶│ B │──▶ null
              └───┘     └───┘

Después:
  cabeza ──▶ ┌───┐     ┌───┐     ┌───┐ ◀── cola
              │ A │────▶│ B │────▶│ C │──▶ null
              └───┘     └───┘     └───┘
  tamanio = 3 (cola.siguiente = nuevo, cola = nuevo)
```

#### agregarAlInicio en lista vacía

```
Igual que agregarAlFinal en vacía: cabeza y cola apuntan al mismo nodo.
```

#### agregarAlInicio en lista con 1 nodo

```
Antes:
  cabeza ──▶ ┌───┐ ◀── cola
              │ A │──▶ null
              └───┘

Después:
  cabeza ──▶ ┌───┐     ┌───┐ ◀── cola
              │ Z │────▶│ A │──▶ null
              └───┘     └───┘
  tamanio = 2 (cabeza se mueve al nuevo)
```

#### agregarAlInicio en lista con varios

```
Antes:
  cabeza ──▶ ┌───┐     ┌───┐ ◀── cola
              │ A │────▶│ B │──▶ null
              └───┘     └───┘

Después:
  cabeza ──▶ ┌───┐     ┌───┐     ┌───┐ ◀── cola
              │ Z │────▶│ A │────▶│ B │──▶ null
              └───┘     └───┘     └───┘
  tamanio = 3 (nuevo.siguiente = cabeza, cabeza = nuevo)
```

### Complejidad de cada método

| Método | Tiempo | Espacio | Justificación |
|--------|--------|---------|---------------|
| agregarAlFinal | O(1) | O(1) | Solo cambia cola.siguiente y cola, sin recorrer |
| agregarAlInicio | O(1) | O(1) | Solo cambia nuevo.siguiente y cabeza, sin recorrer |
| recorrer | O(n) | O(1) | Visita cada nodo una vez |
| aArreglo | O(n) | O(n) | Visita cada nodo y crea un arreglo de n elementos |
| estaVacia | O(1) | O(1) | Compara tamanio con 0 |
| obtenerTamanio | O(1) | O(1) | Devuelve el contador |

## MiniReto 3: Corregir el historial sin romper la cadena

### Dibujos de los 3 casos de eliminación

#### Caso 1: Eliminar la cabeza

```
Antes:
  cabeza ──▶ ┌───┐     ┌───┐     ┌───┐ ◀── cola
              │ A │────▶│ B │────▶│ C │──▶ null
              └───┘     └───┘     └───┘

Después:  cabeza = cabeza.siguiente
  cabeza ──▶ ┌───┐     ┌───┐ ◀── cola
              │ B │────▶│ C │──▶ null
              └───┘     └───┘
```

#### Caso 2: Eliminar un nodo intermedio

```
Antes:
  cabeza ──▶ ┌───┐     ┌───┐     ┌───┐ ◀── cola
              │ A │────▶│ B │────▶│ C │──▶ null
              └───┘     └───┘     └───┘

Después:  anterior.siguiente = anterior.siguiente.siguiente
  cabeza ──▶ ┌───┐              ┌───┐ ◀── cola
              │ A │─────────────▶│ C │──▶ null
              └───┘              └───┘
```

#### Caso 3: Eliminar la cola

```
Antes:
  cabeza ──▶ ┌───┐     ┌───┐     ┌───┐ ◀── cola
              │ A │────▶│ B │────▶│ C │──▶ null
              └───┘     └───┘     └───┘

Después:  anterior.siguiente = null, cola = anterior
  cabeza ──▶ ┌───┐     ┌───┐ ◀── cola
              │ A │────▶│ B │──▶ null
              └───┘     └───┘
```

**¿Por qué eliminar la cola requiere recorrer la lista?** En una lista simplemente enlazada, cada nodo solo conoce al siguiente, no al anterior. Para eliminar la cola necesitamos actualizar el `siguiente` del nodo **anterior** a `null`, y la única forma de llegar a él es recorrer desde la cabeza hasta encontrar el nodo cuyo `siguiente` es la cola.

### Complejidad de las operaciones nuevas

| Método | Tiempo | Espacio | Justificación |
|--------|--------|---------|---------------|
| buscar | O(n) | O(1) | Recorre hasta encontrar o llegar al final |
| insertarDespuesDe | O(n) | O(1) | Recorre hasta el nodo que cumple, inserta en O(1) |
| eliminar (cabeza) | O(1) | O(1) | Solo cambia la referencia de cabeza |
| eliminar (intermedio/cola) | O(n) | O(1) | Necesita encontrar el nodo anterior |

## MiniReto 4: Patitas v0.1 — historiales completos

### Tabla comparativa: ListaEnlazada vs Arreglo

| Operación | ListaEnlazada | Arreglo | Cuándo gana la lista |
|-----------|---------------|---------|----------------------|
| Agregar al final | O(1) con cola | O(1) amortizado | Siempre constante, sin redimensión |
| Agregar al inicio | O(1) | O(n) | No desplaza elementos |
| Eliminar al inicio | O(1) | O(n) | No desplaza elementos |
| Buscar por valor | O(n) | O(n) | Igual — ambos recorren |
| Acceso por índice | O(n) | O(1) | Pierde — no hay acceso directo |

**Conclusión**: la lista enlazada gana cuando las operaciones frecuentes son insertar/eliminar al inicio o en posiciones conocidas. El arreglo gana cuando necesitamos acceso aleatorio por índice. Para historiales clínicos (agregar al final cronológicamente, recorrer completo, buscar por condición), ambos funcionan bien, pero la lista nos enseña cómo funcionan las referencias y la memoria.
