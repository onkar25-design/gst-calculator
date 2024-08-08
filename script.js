let serialNumber = 1;

function formatNumber(num) {
    return num.toLocaleString('en-IN');
}

function calculateGST() {
    const amount = parseFloat(document.getElementById('amount').value);
    const gstType = parseFloat(document.getElementById('gstType').value);
    const taxType = document.getElementById('taxType').value;

    if (isNaN(amount) || isNaN(gstType)) {
        alert("Please enter valid numeric values.");
        return;
    }

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

    document.getElementById('result').innerHTML = `
        <div class="result-item">
            <p>₹${formatNumber(actualAmount.toFixed(2))}</p>
            <small>Actual Amount</small>
        </div>
        <div class="result-item">
            <p>+ ₹${formatNumber(gstAmount.toFixed(2))}</p>
            <small>GST Amount</small>
        </div>
        <div class="result-item">
            <p>= ₹${formatNumber(totalAmount.toFixed(2))}</p>
            <small>Total Amount</small>
        </div>
    `;

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
    updateCookieHistory();
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateSerialNumbers();
    updateCookieHistory();
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

function updateCookieHistory() {
    const rows = document.getElementById('historyList').getElementsByTagName('tr');
    const history = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const entry = {
            srNo: cells[0].textContent,
            amount: cells[1].textContent,
            gstType: cells[2].textContent,
            taxType: cells[3].textContent,
            actualAmount: cells[4].textContent,
            gstAmount: cells[5].textContent,
            totalAmount: cells[6].textContent
        };
        history.push(entry);
    }

    document.cookie = `history=${JSON.stringify(history)}; path=/`;
}

function loadHistoryFromCookie() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('history='))
        ?.split('=')[1];

    if (cookieValue) {
        const history = JSON.parse(cookieValue);
        history.forEach(entry => {
            addToHistory(entry.srNo, parseFloat(entry.amount.replace(/,/g, '')), parseFloat(entry.gstType), entry.taxType.toLowerCase(), parseFloat(entry.actualAmount.replace(/,/g, '')), parseFloat(entry.gstAmount.replace(/,/g, '')), parseFloat(entry.totalAmount.replace(/,/g, '')));
        });
    }
}

window.onload = loadHistoryFromCookie;
