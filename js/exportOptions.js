// Obtener referencia a los elementos HTML
const exportBtn = document.getElementById('export-btn');

// Agregar evento al botón de exportar
exportBtn.addEventListener('click', () => {
  const wb = XLSX.utils.table_to_book(document.getElementById('inventory-table'), { sheet: 'Inventario' });
  XLSX.writeFile(wb, 'inventario.xlsx');
});
