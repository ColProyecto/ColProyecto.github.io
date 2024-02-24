document.addEventListener('DOMContentLoaded', function() {
  const exportBtn = document.querySelector('#export-btn');
  exportBtn.addEventListener('click', exportToExcel);

  function exportToExcel() {
    const table = document.getElementById('inventory-table');

    const columnNames = [];
    const headerCells = Array.from(table.querySelectorAll('thead th'));
    headerCells.forEach(cell => {
      columnNames.push(cell.textContent.trim());
    });

    const data = [];

    data.push(columnNames);

    const rows = Array.from(table.querySelectorAll('tbody tr'));

    rows.forEach(row => {
      const rowData = [];

      const cells = Array.from(row.querySelectorAll('td'));

      cells.forEach((cell, index) => {
        let cellText = cell.textContent.trim();

        if (cellText.includes('\n')) {
          cellText = cellText.split('\n')[0];
        }

        if (columnNames[index] === "Categoría") {
          cellText = cell.querySelector('select').value;
        }

        rowData.push(cellText);
      });

      data.push(rowData);
    });

    const totalRow = [];
    const totalCells = table.querySelector('tfoot').querySelectorAll('td');
    totalCells.forEach(cell => {
      totalRow.push(cell.textContent.trim());
    });

    const now = new Date();
    const formattedDate = formatDate(now);
    const formattedTime = formatTime(now);

    // Crear el nombre del archivo
    const fileName = `inventario-${formattedDate}-${formattedTime}.xlsx`;

    const inventoryDate = "Inventario";
    const totalTitleRow = ["Total"];
    const combinedRow = [inventoryDate, totalTitleRow, ...totalRow];

    data.push([]);
    data.push(combinedRow);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Inventario");

    XLSX.writeFile(wb, fileName);
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}-${minutes}-${seconds}`;
  }
});
