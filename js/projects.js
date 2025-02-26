document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".parallax[data-project]");
    const projectsList = document.getElementById("projects-list");
    const projectDetails = document.getElementById("project-details");
    const projectContent = document.getElementById("project-content");

    // Fetch project data from JSON file
    fetch('../assets/data/project-data.json') // Update the path to your projects.json file
        .then(response => response.json())
        .then(data => {
            const projectInfo = {};
            data.forEach(project => {
                projectInfo[project.id] = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <img src="${project.image}" alt="${project.title}" style="max-width: 100%;" />
                `;
            });

            // Set up event listeners for project items
            projects.forEach(project => {
                project.addEventListener("click", function () {
                    const projectKey = this.getAttribute("data-project");

                    // Show project details and hide project list
                    projectsList.style.display = "none";
                    projectDetails.style.display = "block";
                    projectContent.innerHTML = projectInfo[projectKey] || "<p>Project not found.</p>";

                    // Scroll to the top of the page
                    window.scrollTo(0, 0);

                    // Add a new state to the history
                    history.pushState({ projectKey: projectKey }, '', ''); // Push state
                });
            });
        })
        .catch(error => console.error('Error fetching project data:', error));

    // Handle back button functionality
    window.addEventListener('popstate', function (event) {
        // If there's no state, we are returning to the main projects view
        projectsList.style.display = "block";
        projectDetails.style.display = "none";
        projectContent.innerHTML = ''; // Clear project content
    });
});
