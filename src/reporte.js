const RegistroClinico = require('./RegistroClinico');

const clinica = new RegistroClinico();

clinica.registrarAtencion('Lola (gata)', { fecha: '02/02', motivo: 'Vacunación anual', veterinario: 'Dra. Ríos', costo: 85000 });
clinica.registrarAtencion('Lola (gata)', { fecha: '15/03', motivo: 'Control de peso', veterinario: 'Dr. Gómez', costo: 40000 });
clinica.registrarAtencion('Lola (gata)', { fecha: '20/05', motivo: 'Limpieza dental', veterinario: 'Dra. Ríos', costo: 150000 });

clinica.registrarAtencion('Toby (perro)', { fecha: '10/01', motivo: 'Consulta por cojera', veterinario: 'Dr. Gómez', costo: 60000 });
clinica.registrarAtencion('Toby (perro)', { fecha: '12/01', motivo: 'Radiografía de pata', veterinario: 'Dr. Gómez', costo: 120000 });
clinica.registrarAtencion('Toby (perro)', { fecha: '05/04', motivo: 'Vacunación anual', veterinario: 'Dra. Ríos', costo: 85000 });

clinica.registrarAtencion('Mía (gata)', { fecha: '18/02', motivo: 'Esterilización', veterinario: 'Dra. Ríos', costo: 280000 });
clinica.registrarAtencion('Mía (gata)', { fecha: '25/02', motivo: 'Control posquirúrgico', veterinario: 'Dra. Ríos', costo: 0 });

console.log('╔══════════════════════════════════════════╗');
console.log('║   PATITAS v0.1 — Historiales Clínicos    ║');
console.log('╚══════════════════════════════════════════╝\n');

for (const mascota of clinica.mascotas()) {
  const historial = clinica.obtenerHistorial(mascota);

  console.log(`── ${mascota} ──`);

  let costoTotal = 0;
  historial.recorrer((a) => {
    console.log(`  ${a.fecha} | ${a.motivo} | ${a.veterinario} | $${a.costo.toLocaleString('es-CO')}`);
    costoTotal += a.costo;
  });

  console.log(`  Atenciones: ${historial.obtenerTamanio()}`);
  console.log(`  Costo total: $${costoTotal.toLocaleString('es-CO')}`);

  let ultimaVacuna = null;
  historial.recorrer((a) => {
    if (a.motivo.toLowerCase().includes('vacunación')) {
      ultimaVacuna = a;
    }
  });

  if (ultimaVacuna) {
    console.log(`  Última vacunación: ${ultimaVacuna.fecha} — ${ultimaVacuna.veterinario}`);
  } else {
    console.log('  Sin vacunaciones registradas');
  }

  console.log();
}
