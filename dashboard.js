// Add at the beginning of dashboard.js
const DEBUG = true;

function debug(...args) {
    if (DEBUG) {
        console.log('[Dashboard]', ...args);
    }
}

// Check authentication before initializing dashboard
function checkAuth() {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe(); // Unsubscribe once we get the auth state
            if (user) {
                debug('User is authenticated:', user.email);
                resolve(user);
            } else {
                debug('User is not authenticated');
                reject(new Error('Not authenticated'));
            }
        });
    });
}

// Initialize dashboard only after authentication check
async function initializeDashboard() {
    try {
        // Check authentication first
        const user = await checkAuth();
        
        // Initialize Firebase services
        const auth = firebase.auth();
        const db = firebase.firestore();
        const storage = firebase.storage();

        debug('Initializing dashboard for user:', user.email);

        // Load user data and projects
        await loadUserData();
        await loadProjects();

        // Show default section (overview)
        const defaultSection = document.querySelector('[data-section="overview"]');
        if (defaultSection) {
            defaultSection.click();
        }

        // Initialize navigation
        initializeNavigation();
        
        // Show success notification
        showNotification('Welcome', 'Dashboard loaded successfully', 'success');

    } catch (error) {
        debug('Dashboard initialization error:', error);
        showNotification('Authentication Error', 'Please log in to access the dashboard', 'error');
        setTimeout(() => {
            window.location.replace('login.html');
        }, 2000);
    }
}

// Start initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Show loading state
    document.body.classList.add('loading');
    
    initializeDashboard().finally(() => {
        // Remove loading state
        document.body.classList.remove('loading');
    });
});

// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links li');
const logoutBtn = document.getElementById('logoutBtn');
const projectForm = document.getElementById('projectForm');
const activityModal = document.getElementById('activityModal');
const activityForm = document.getElementById('activityForm');
const settingsForm = document.getElementById('settingsForm');

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        if (!sectionId) return;

        // Update active states
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    });
});

// Logout handler
logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
        showNotification('Success', 'Logged out successfully', 'success');
        setTimeout(() => {
            window.location.replace('login.html');
        }, 1500);
    } catch (error) {
        showNotification('Error', 'Failed to log out: ' + error.message, 'error');
    }
});

// Add this helper function at the beginning of dashboard.js
function getElement(id, fallback = null) {
    const element = document.getElementById(id);
    if (!element && !fallback) {
        console.warn(`Element with id "${id}" not found`);
    }
    return element || fallback;
}

// Update loadUserData function
async function loadUserData() {
    try {
        const user = auth.currentUser;
        if (!user) return;

        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            
            // Update UI elements safely
            const usernameEl = getElement('username');
            const userEmailEl = getElement('userEmail');
            const fullNameEl = getElement('fullName');
            const emailEl = getElement('email');

            if (usernameEl) usernameEl.textContent = userData.name || 'User';
            if (userEmailEl) userEmailEl.textContent = user.email;
            if (fullNameEl) fullNameEl.value = userData.name || '';
            if (emailEl) emailEl.value = user.email;
        }
    } catch (error) {
        showNotification('Error', 'Failed to load user data: ' + error.message, 'error');
        throw error;
    }
}

// Create project handler
if (projectForm) {
    projectForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const button = projectForm.querySelector('button');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';

            const title = document.getElementById('projectTitle').value;
            const description = document.getElementById('projectDescription').value;
            const date = document.getElementById('projectDate').value;
            const imageFile = document.getElementById('projectImage').files[0];
            const imageLink = document.getElementById('imageLink').value;

            let imageUrl = imageLink;
            if (imageFile) {
                const storageRef = storage.ref(`projects/${auth.currentUser.uid}/${Date.now()}_${imageFile.name}`);
                await storageRef.put(imageFile);
                imageUrl = await storageRef.getDownloadURL();
            }

            await db.collection('projects').add({
                userId: auth.currentUser.uid,
                title,
                description,
                date,
                imageUrl,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            showNotification('Success', 'Project created successfully!', 'success');
            projectForm.reset();
            document.getElementById('imagePreview').innerHTML = '';
            
            // Refresh projects list
            loadProjects();
            
            // Switch to projects section
            document.querySelector('[data-section="projects"]').click();
        } catch (error) {
            showNotification('Error', 'Failed to create project: ' + error.message, 'error');
        } finally {
            const button = projectForm.querySelector('button');
            button.disabled = false;
            button.textContent = 'Create Project';
        }
    });
}

// Load projects
async function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;

    try {
        projectGrid.innerHTML = '<div class="loading">Loading projects...</div>';
        
        const snapshot = await db.collection('projects')
            .where('userId', '==', auth.currentUser.uid)
            .orderBy('createdAt', 'desc')
            .get();

        projectGrid.innerHTML = '';
        
        if (snapshot.empty) {
            projectGrid.innerHTML = '<div class="no-data">No projects found</div>';
            return;
        }

        snapshot.forEach(doc => {
            const project = doc.data();
            const card = createProjectCard(doc.id, project);
            projectGrid.appendChild(card);
        });

        // Update project count
        document.getElementById('totalProjects').textContent = snapshot.size;
    } catch (error) {
        console.error('Error loading projects:', error);
        projectGrid.innerHTML = '<div class="error">Error loading projects</div>';
    }
}

// Create project card
function createProjectCard(id, project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.imageUrl || 'placeholder.jpg'}" alt="${project.title}">
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-timestamp">${new Date(project.date).toLocaleDateString()}</p>
            <p class="project-description">${project.description}</p>
            <button class="delete-project" data-id="${id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    // Delete project handler
    card.querySelector('.delete-project').addEventListener('click', async (e) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                await db.collection('projects').doc(id).delete();
                card.remove();
                showNotification('Success', 'Project deleted successfully', 'success');
                loadProjects();
            } catch (error) {
                showNotification('Error', 'Failed to delete project: ' + error.message, 'error');
            }
        }
    });

    return card;
}

// Image preview handler
const projectImage = document.getElementById('projectImage');
if (projectImage) {
    projectImage.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                `;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Notification system
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Set icon based on type
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

    // Add close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
} 