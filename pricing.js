document.addEventListener('DOMContentLoaded', function() {
    const billingToggle = document.getElementById('billingToggle');
    const monthlyPrices = document.querySelectorAll('.amount.monthly');
    const yearlyPrices = document.querySelectorAll('.amount.yearly');
    const periodTexts = document.querySelectorAll('.period');

    billingToggle.addEventListener('change', function() {
        monthlyPrices.forEach(price => {
            price.style.display = this.checked ? 'none' : 'inline';
        });
        
        yearlyPrices.forEach(price => {
            price.style.display = this.checked ? 'inline' : 'none';
        });

        periodTexts.forEach(period => {
            period.textContent = this.checked ? '/年' : '/月';
        });
    });
}); 