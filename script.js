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

    document.getElementById('actualAmount').textContent = `Actual Amount: ₹${actualAmount.toFixed(2)}`;
    document.getElementById('gstAmount').textContent = `GST Amount: ₹${gstAmount.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `Total Amount: ₹${totalAmount.toFixed(2)}`;
}
