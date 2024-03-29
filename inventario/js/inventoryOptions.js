// inventoryOptions.js
// Obtener referencia a los elementos HTML
const inventoryTable = document.getElementById('inventory-table');
const addRowBtn = document.getElementById('add-row-btn');
const addColumnBtn = document.getElementById('add-column-btn');
const totalQuantity = document.getElementById('total-quantity');
const totalPrice = document.getElementById('total-price');
const calculateBtn = document.getElementById('calculate-btn');
const exportBtn = document.getElementById('export-btn');

// Función para agregar fila al hacer clic en el botón "Agregar fila"
addRowBtn.addEventListener('click', () => {
  const newRow = document.createElement('tr');
  const columnCount = inventoryTable.rows[0].cells.length;

  for (let i = 0; i < columnCount; i++) {
    const newCell = document.createElement('td');
    if (i === 0) {
      // Crear el botón dentro de un <td> con la clase "delete-column"
      const buttonCell = document.createElement('td');
      buttonCell.className = 'delete-column';
      const deleteRowBtn = document.createElement('button');
      deleteRowBtn.textContent = 'X';
      deleteRowBtn.className = 'delete-row-btn';
      deleteRowBtn.addEventListener('click', () => {
        newRow.remove();
        updateTotals();
      });
      buttonCell.appendChild(deleteRowBtn);
      newRow.appendChild(buttonCell);
    } else if (i === 4) {
      const categoryCell = document.createElement('td');
      const categorySelect = document.createElement('select');
      categorySelect.className = 'category-select';
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Sin categoría';
      categorySelect.appendChild(defaultOption);
      categoryCell.appendChild(categorySelect);
      newRow.appendChild(categoryCell);
    } else {
      newCell.contentEditable = true;
      newCell.className = 'numeric-field';
      newRow.appendChild(newCell);
    }
  }

  inventoryTable.querySelector('tbody').appendChild(newRow);
  updateTotals();
  populateCategoryOptions();
});

// Función para agregar columna al hacer clic en el botón "Agregar columna"
addColumnBtn.addEventListener('click', () => {
  const columnName = prompt('Ingrese el nombre de la columna:');
  if (columnName) {
    const headerRow = inventoryTable.querySelector('thead tr');
    const newHeaderCell = document.createElement('th');
    newHeaderCell.textContent = columnName;

    // Crear botón de eliminar columna
    const deleteColumnBtn = document.createElement('button');
    deleteColumnBtn.textContent = 'X';
    deleteColumnBtn.classList.add('delete-column-btn');
    deleteColumnBtn.addEventListener('click', () => {
      deleteColumn(newHeaderCell.cellIndex);
    });

    // Añadir botón de eliminar columna junto con el nombre de la columna
    newHeaderCell.appendChild(deleteColumnBtn);

    headerRow.appendChild(newHeaderCell);

    const rows = inventoryTable.querySelectorAll('tbody tr');
    rows.forEach((row) => {
      const newCell = document.createElement('td');
      newCell.contentEditable = true;
      newCell.className = 'numeric-field';
      row.appendChild(newCell);
    });
  }
});

// Función para eliminar columna
function deleteColumn(columnIndex) {
  const headerRow = inventoryTable.querySelector('thead tr');
  const rows = inventoryTable.querySelectorAll('tbody tr');

  // Eliminar la columna del encabezado
  headerRow.deleteCell(columnIndex);

  // Eliminar la columna de cada fila de la tabla
  rows.forEach((row) => {
    row.deleteCell(columnIndex);
  });

  updateTotals();
}

// Función para calcular totales al hacer clic en el botón "Calcular"
calculateBtn.addEventListener('click', updateTotals);

// Función para actualizar los totales de cantidades y precios
function updateTotals() {
  const rows = inventoryTable.querySelectorAll('tbody tr');
  let totalQuantityValue = 0;
  let totalPriceValue = 0;
  rows.forEach((row) => {
    const quantity = parseInt(row.cells[2].textContent);
    const price = parseFloat(row.cells[3].textContent);
    if (!isNaN(quantity)) {
      totalQuantityValue += quantity;
    }
    if (!isNaN(price)) {
      totalPriceValue += price;
    }
  });
  totalQuantity.textContent = totalQuantityValue;
  totalPrice.textContent = totalPriceValue.toFixed(2);
}

// Generar opciones de categoría en todos los campos de selección existentes
function populateCategoryOptions() {
  const categorySelects = document.querySelectorAll('.category-select');
  categorySelects.forEach((select) => {
    const selectedCategory = select.value;

    select.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Sin categoría';
    select.appendChild(defaultOption);

    // Utilizar categories para generar las opciones del select
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.name; // Ajustar al atributo correcto del objeto de categoría
      option.textContent = category.name; // Ajustar al atributo correcto del objeto de categoría
      select.appendChild(option);
    });

    select.value = selectedCategory;
  });
}
