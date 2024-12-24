// Initialize Firebase Auth
const auth = firebase.auth();
const db = firebase.firestore();

// Add at the beginning of the file
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let icon;
    switch(type) {
        case 'success':
            icon = 'fas fa-check-circle';
            break;
        case 'error':
            icon = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            icon = 'fas fa-exclamation-triangle';
            break;
        default:
            icon = 'fas fa-info-circle';
    }

    notification.innerHTML = `
        <i class="${icon}"></i>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <div class="notification-close">
            <i class="fas fa-times"></i>
        </div>
    `;

    container.appendChild(notification);

    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        try {
            const button = loginForm.querySelector('button');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

            // Set persistence
            if (rememberMe) {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            } else {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
            }

            // Sign in
            await auth.signInWithEmailAndPassword(email, password);
            
            // Show success message
            showNotification('Success', 'Login successful! Redirecting...', 'success');
            
            // Wait briefly before redirect
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Redirect to dashboard
            window.location.replace('dashboard.html');
        } catch (error) {
            console.error('Login error:', error);
            showNotification('Login Failed', error.message, 'error');
            button.disabled = false;
            button.textContent = 'Login';
        }
    });
}

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const adminCode = document.getElementById('adminCode').value;

        // Verify admin code
        if (adminCode !== 'GEODASHBOARD121') {
            showNotification('Error', 'Invalid admin code', 'error');
            return;
        }

        try {
            const button = signupForm.querySelector('button');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';

            // Create user account
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            
            // Create user profile in Firestore
            await db.collection('users').doc(userCredential.user.uid).set({
                name: name,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Update profile
            await userCredential.user.updateProfile({
                displayName: name
            });

            showNotification('Success', 'Account created successfully! Redirecting...', 'success');
            
            // Ensure user is properly authenticated before redirect
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Force redirect to dashboard
            window.location.replace('dashboard.html');
        } catch (error) {
            showNotification('Signup Failed', error.message, 'error');
            button.disabled = false;
            button.textContent = 'Sign Up';
        }
    });
}

// Message display function
function showMessage(message, type = 'error') {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    const form = document.querySelector('form');
    form.parentNode.insertBefore(messageDiv, form);

    setTimeout(() => messageDiv.remove(), 3000);
}

// Check authentication state
auth.onAuthStateChanged(user => {
    const currentPath = window.location.pathname;
    
    if (user) {
        // If user is logged in and on login/signup page, redirect to dashboard
        if (currentPath.includes('login.html') || currentPath.includes('signup.html')) {
            window.location.replace('dashboard.html');
        }
    } else {
        // If user is not logged in and trying to access dashboard, redirect to login
        if (currentPath.includes('dashboard.html')) {
            window.location.replace('login.html');
        }
    }
}); 