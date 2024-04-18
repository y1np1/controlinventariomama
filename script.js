document.addEventListener('DOMContentLoaded', loadHistory); // Asegura que el historial se carga al iniciar.
document.getElementById('deliveryForm').addEventListener('submit', submitForm);
document.getElementById('clearData').addEventListener('click', clearHistory);

function submitForm(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let packages = document.getElementById('packages').value;
    let deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
    
    let data = {name: name, packages: packages, deliveryType: deliveryType};
    saveData(data);
    updateHistory(data);
    alert('Registro agregado con exito!');
}

function saveData(data) {
    let existingEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
    existingEntries.push(data);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
}

function loadHistory() {
    let existingEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
    existingEntries.forEach(updateHistory); // Actualiza la lista con los datos existentes.
}

function clearHistory() {
    if(confirm("Estas seguro de borrar el historial?, esto no se puede deshacer.")) {
        localStorage.clear();
        document.getElementById("historyList").innerHTML = ""; // Limpia visualmente el historial.
    }
}

function updateHistory(data) {
    let historyElement = document.getElementById("historyList");
    let newItem = document.createElement("li");
    newItem.textContent = `Name: ${data.name}, Packages: ${data.packages}, Delivery Type: ${data.deliveryType}`;
    historyElement.appendChild(newItem);
}

// Función exportData() va aquí - sin cambios.


function exportData() {
    let data = JSON.parse(localStorage.getItem("allEntries"));
    // Asegurándonos de que no haya una línea vacía al inicio.
    let csvContent = "data:text/csv;charset=utf-8,Name;Packages;Delivery Type\n"; // Esta es la primera línea, con los encabezados.
    
    data.forEach(function(infoArray) {
        let row = infoArray.name + ";" + infoArray.packages + ";" + infoArray.deliveryType;
        csvContent += row + "\n";
    });
    
    // Crear un enlace y hacer click en él para descargar el archivo.
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "delivery_data.txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function updateHistory(data) {
    let historyElement = document.getElementById("historyList");
    let newItem = document.createElement("li");
    newItem.textContent = `Nombre: ${data.name}, Paquetes: ${data.packages}, Tipo de entrega: ${data.deliveryType}`;
    historyElement.appendChild(newItem);
}
