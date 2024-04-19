document.getElementById('entryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const packages = document.getElementById('packages').value;
    const deliveryType = document.getElementById('deliveryType').value;
    const entry = { name, packages, deliveryType };
    saveEntry(entry);
    showEntry(entry);
    clearForm();
    showSuccessNotification(); // Muestra la notificación en lugar de la alerta
});
function showSuccessNotification() {
    const notification = document.getElementById('successNotification');
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}


function saveEntry(entry) {
    let history = localStorage.getItem('history');
    history = history ? JSON.parse(history) : [];
    history.push(entry);
    localStorage.setItem('history', JSON.stringify(history));
}

function showEntry(entry) {
    const li = document.createElement('li');
    li.textContent = `Name: ${entry.name}, Packages: ${entry.packages}, Delivery: ${entry.deliveryType}`;
    document.getElementById('historyList').appendChild(li);
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.forEach(entry => showEntry(entry));
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('packages').value = '';
    document.getElementById('deliveryType').value = 'agency';
}

document.getElementById('clearButton').addEventListener('click', function() {
    if(confirm("Estas seguro de limpiar el historial?")) {
        clearHistory();
    }
});

function clearHistory() {
    localStorage.removeItem('history');
    document.getElementById('historyList').innerHTML = '';
}

function exportData() {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    const dataString = history.map(entry => `${entry.name};${entry.packages};${entry.deliveryType}`).join('\n');
    const blob = new Blob([dataString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrationData.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Cargar el historial al cargar la página
window.onload = loadHistory;
