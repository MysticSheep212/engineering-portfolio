document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll(".parallax[data-project]");
  const projectsList = document.getElementById("projects-list");
  const projectDetails = document.getElementById("project-details");
  const projectContent = document.getElementById("project-content");

  fetch("../assets/data/project-data.json")
    .then((response) => response.json())
    .then((data) => {
      const projectInfo = {};

      data.forEach((project) => {
        const lightboxId = `lightbox-${project.id}`;

        // Generate all images
        let imagesHTML = project.images
          .map(
            (image, imgIndex) => `
            <a href="#${lightboxId}-${imgIndex}" class="project-info-pictures">
              <img src="${image}" alt="${project.title} - Image ${
              imgIndex + 1
            }" />
            </a>
            <div id="${lightboxId}-${imgIndex}" class="lightbox">
              <div class="overlay"></div>
              <img src="${image}" alt="${project.title} - Image ${
              imgIndex + 1
            }">
            </div>
          `
          )
          .join("");
        // Join all image elements into one string

        // Store project info with multiple images
        projectInfo[project.id] = `
            <div class="project-info">
              <h2>${project.title}</h2>
              <p>${project.description}</p>
              <div class="project-info-pictures-container">${imagesHTML}</div>
            </div>
          `;
      });

      // Set up event listeners for project items
      projects.forEach((project) => {
        project.addEventListener("click", function () {
          const projectKey = this.getAttribute("data-project");

          // Show project details and hide project list
          projectsList.style.display = "none";
          projectDetails.style.display = "block";
          projectContent.innerHTML =
            projectInfo[projectKey] || "<p>Project not found.</p>";

          window.scrollTo(0, 0); // Scroll to the top
          history.pushState({ projectKey: projectKey }, "", "");
        });
      });
    })
    .catch((error) => console.error("Error fetching project data:", error));

  // Handle back button functionality
  window.addEventListener("popstate", function () {
    projectsList.style.display = "block";
    projectDetails.style.display = "none";
    projectContent.innerHTML = "";
  });
});
