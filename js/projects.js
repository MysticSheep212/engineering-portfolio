document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll(".parallax[data-project]");
  const projectsList = document.getElementById("projects-list");
  const projectDetails = document.getElementById("project-details");
  const projectContent = document.getElementById("project-content");

  // Fetch project data from JSON file
  fetch("../assets/data/project-data.json")
    .then((response) => response.json())
    .then((data) => {
      const projectInfo = {};

      // Generate HTML for each project
      data.forEach((project) => {
        let imagesHTML = project.images
          .map(
            (image, imgIndex) => `
              <div class="project-info-pictures" data-image="${image}">
                <img src="${image}" alt="${project.title} - Image ${
              imgIndex + 1
            }" />
              </div>
            `
          )
          .join("");

        const descriptionHTML = project.description
          .map(
            (section) => `
              <h3>${section.section}</h3>
              <p>${section.text}</p>
            `
          )
          .join("");

        projectInfo[project.id] = `
          <div class="project-info">
            <h2>${project.title}</h2>
            ${descriptionHTML}
            <div class="project-info-pictures-container">${imagesHTML}</div>
          </div>
        `;
      });

      // Add event listeners for each project
      projects.forEach((project) => {
        project.addEventListener("click", function () {
          const projectKey = this.getAttribute("data-project");

          projectsList.style.display = "none";
          projectDetails.style.display = "block";
          projectContent.innerHTML =
            projectInfo[projectKey] || "<p>Project not found.</p>";

          window.scrollTo(0, 0);
          history.pushState({ projectKey: projectKey }, "", "");
        });
      });

      // Event Delegation for Lightbox Clicks
      projectContent.addEventListener("click", function (event) {
        const target = event.target.closest(".project-info-pictures");
        if (target) {
          const imageSrc = target.getAttribute("data-image");
          openLightbox(imageSrc);
        }
      });

      // Handle back button functionality
      window.addEventListener("popstate", function () {
        projectsList.style.display = "block";
        projectDetails.style.display = "none";
        projectContent.innerHTML = "";
      });
    })
    .catch((error) => console.error("Error fetching project data:", error));
});
