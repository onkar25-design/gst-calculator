let serialNumber = 1; // Initialize the serial number

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

    // Display results without commas
    document.getElementById('actualAmount').textContent = `Actual Amount: ₹${actualAmount.toFixed(2)}`;
    document.getElementById('gstAmount').textContent = `GST Amount: ₹${gstAmount.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `Total Amount: ₹${totalAmount.toFixed(2)}`;

    // Add to history
    addToHistory(serialNumber++, amount, gstType, taxType, gstAmount, totalAmount);
}

function addToHistory(srNo, amount, gstType, taxType, gstAmount, totalAmount) {
    const historyList = document.getElementById('historyList');

    // Create a new row
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${srNo}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${gstType}</td>
        <td>${taxType.charAt(0).toUpperCase() + taxType.slice(1)}</td>
        <td>${gstAmount.toFixed(2)}</td>
        <td>${totalAmount.toFixed(2)}</td>
    `;

    // Add the row to the table
    historyList.appendChild(row);
}