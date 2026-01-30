document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    const userNameElement = document.getElementById('user-name');
    
    if (userNameElement) {
        let userName = localStorage.getItem('userName');
        
        if (!userName || userName.trim() === '' || userName.trim() === 'Guest') {
            userName = prompt('Masukkan nama Anda:');
            
            if (userName && userName.trim() !== '') {
                userName = userName.trim();
                localStorage.setItem('userName', userName);
            } else {
                userName = 'Guest';
            }
        }
        
        userNameElement.textContent = userName;
        
        console.log('Welcome message updated. Name:', userName);
    } else {
        console.error('Error: Element with id "user-name" not found in the DOM!');
    }

    const messageForm = document.getElementById('message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            clearErrors();

            let isValid = true;

            if (name === '') {
                showError('name-error', 'Nama harus diisi');
                isValid = false;
            } else if (name.length < 3) {
                showError('name-error', 'Nama minimal 3 karakter');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                showError('email-error', 'Email harus diisi');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('email-error', 'Format email tidak valid');
                isValid = false;
            }

            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (phone === '') {
                showError('phone-error', 'Phone Number harus diisi');
                isValid = false;
            } else if (!phoneRegex.test(phone)) {
                showError('phone-error', 'Format phone number tidak valid');
                isValid = false;
            } else if (phone.replace(/[^0-9]/g, '').length < 10) {
                showError('phone-error', 'Phone number minimal 10 digit');
                isValid = false;
            }

            if (message === '') {
                showError('message-error', 'Pesan harus diisi');
                isValid = false;
            } else if (message.length < 10) {
                showError('message-error', 'Pesan minimal 10 karakter');
                isValid = false;
            }

            if (isValid) {
                displayFormData(name, email, phone, message);
            }
        });
    }

    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
});

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function displayFormData(name, email, phone, message) {
    const displayName = document.getElementById('display-name');
    const displayEmail = document.getElementById('display-email');
    const displayPhone = document.getElementById('display-phone');
    const displayMessage = document.getElementById('display-message');

    if (displayName) displayName.textContent = name;
    if (displayEmail) displayEmail.textContent = email;
    if (displayPhone) displayPhone.textContent = phone;
    if (displayMessage) displayMessage.textContent = message;
}

function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    if (currentTimeElement) {
        const now = new Date();
        currentTimeElement.textContent = 'Current time: ' + now.toString();
    }
}

function resetUserName() {
    localStorage.removeItem('userName');
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        const newName = prompt('Masukkan nama baru Anda:');
        if (newName && newName.trim() !== '') {
            localStorage.setItem('userName', newName.trim());
            userNameElement.textContent = newName.trim();
            console.log('Name reset to:', newName.trim());
        }
    }
}

window.resetUserName = resetUserName;
