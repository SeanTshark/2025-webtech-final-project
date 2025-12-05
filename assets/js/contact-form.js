document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous errors and success message
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    document.getElementById('successMessage').textContent = '';

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate Name
    let nameRegex = /^[A-Za-z\s'-]+$/;
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    } else if (name.length < 3) {
        document.getElementById('nameError').textContent = 'Name has to more than 3 characters';
        isValid = false;
    } else if (!nameRegex.test(name)) {
        document.getElementById('nameError').textContent = 'Valid name is required';
        isValid = false;
    }

    // Validate Email using Regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Valid email is required';
        isValid = false;
    }

    // Validate Message
    let messageRegex = /^[^<>]{1,2000}$/;
    if (message === '') {
        document.getElementById('messageError').textContent = 'Message cannot be empty';
        isValid = false;
    } else if (!messageRegex.test(message)) {
        document.getElementById('messageError').textContent = 'Valid message is required';
        isValid = false;
    }

    if (isValid) {
        // Show success message
        document.getElementById('successMessage').textContent = 'Your message has been sent successfully!';

        // Clear form fields
        document.getElementById('contactForm').reset();

        // Optionally hide success message after few seconds
        setTimeout(() => {
            document.getElementById('successMessage').textContent = '';
        }, 5000);
    }
});