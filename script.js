let serialNumber = 1;

function calculateGST() {
    const amount = parseFloat(document.getElementById('amount').value);
    const gstType = parseFloat(document.getElementById('gstType').value);
    const taxType = document.getElementById('taxType').value;

    let gstAmount, totalAmount, actualAmount;

    if (taxType === 'inclusive') {
        actualAmount = amount / (1 + (gstType / 100));
        gstAmount = amount - actualAmount;
        totalAmount = amount;
    } else {
        gstAmount = amount * (gstType / 100);
        totalAmount = amount + gstAmount;
        actualAmount = amount;
    }

    document.getElementById('actualAmount').textContent = `Actual Amount: ₹${formatNumber(actualAmount.toFixed(2))}`;
    document.getElementById('gstAmount').textContent = `GST Amount: ₹${formatNumber(gstAmount.toFixed(2))}`;
    document.getElementById('totalAmount').textContent = `Total Amount: ₹${formatNumber(totalAmount.toFixed(2))}`;

    addToHistory(serialNumber++, amount, gstType, taxType, actualAmount, gstAmount, totalAmount);
}

function addToHistory(srNo, amount, gstType, taxType, actualAmount, gstAmount, totalAmount) {
    const historyList = document.getElementById('historyList');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${srNo}</td>
        <td>${formatNumber(amount.toFixed(2))}</td>
        <td>${gstType}</td>
        <td>${taxType.charAt(0).toUpperCase() + taxType.slice(1)}</td>
        <td>${formatNumber(actualAmount.toFixed(2))}</td>
        <td>${formatNumber(gstAmount.toFixed(2))}</td>
        <td>${formatNumber(totalAmount.toFixed(2))}</td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
    `;

   
    row.addEventListener('click', function() {
        row.classList.toggle('highlight');
    });

    historyList.appendChild(row);
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateSerialNumbers();
}

function updateSerialNumbers() {
    const rows = document.getElementById('historyList').getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1;
    }
    serialNumber = rows.length + 1;
}

function formatNumber(num) {
    let [integer, decimal] = num.split('.');
    let lastThree = integer.slice(-3);
    let otherNumbers = integer.slice(0, -3);
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    let formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return decimal ? formatted + '.' + decimal : formatted;
}