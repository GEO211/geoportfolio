// Initialize Firebase (make sure to use your own config)
const firebaseConfig = {
    apiKey: "AIzaSyACe57ULrtFWBkTMZaExGTuCJb8GKhawPw",
    authDomain: "finals-calculator-21.firebaseapp.com",
    projectId: "finals-calculator-21",
    storageBucket: "finals-calculator-21.firebasestorage.app",
    messagingSenderId: "234377632584",
    appId: "1:234377632584:web:bf92d92752829426f0717d",
    measurementId: "G-9CYRQR52LP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const db = firebase.firestore();

// Function to load and display projects
function loadProjects() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = 'Loading projects...';

    db.collection('projects').get().then((querySnapshot) => {
        projectList.innerHTML = ''; // Clear loading message

        if (querySnapshot.empty) {
            projectList.innerHTML = '<p>No projects available at this time.</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const project = doc.data();
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';

            const createdAt = project.createdAt ? project.createdAt.toDate().toLocaleDateString() : 'No date available';

            projectCard.innerHTML = `
                <div class="project-image">
                    ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.title}">` : 'No Image'}
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-timestamp">${createdAt}</p>
                    <p class="project-description">Description: ${project.description}</p>
                    <a href="${project.projectLink}" target="_blank" class="project-link">VISIT LINK</a>
                </div>
            `;
            projectList.appendChild(projectCard);
        });
    }).catch((error) => {
        console.error("Error loading projects: ", error);
        projectList.innerHTML = '<p>Error loading projects. Please try again later.</p>';
    });
}

// Load projects when the page is fully loaded
document.addEventListener('DOMContentLoaded', loadProjects);

