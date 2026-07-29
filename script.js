document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inquiryForm');
    const statusMsg = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('studentName').value;
        const phone = document.getElementById('phone').value;
        const course = document.getElementById('course').value;

        // Client-side validation check
        if (phone.length < 10) {
            statusMsg.style.color = 'red';
            statusMsg.textContent = 'Please enter a valid 10-digit phone number.';
            return;
        }

        // Displays confirmation message
        statusMsg.style.color = 'green';
        statusMsg.textContent = `Thank you, ${name}! Your inquiry for ${course} has been received. We will contact you at ${phone}.`;

        // Clear form
        form.reset();
    });
});