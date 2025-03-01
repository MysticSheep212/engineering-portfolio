document.addEventListener("DOMContentLoaded", function () {
  const projectsList = document.getElementById("projects-list");
  const projectDetails = document.getElementById("project-details");
  const projectContent = document.getElementById("project-content");

  function getProjectFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("project") || window.location.hash.substring(1);
  }

  fetch("../assets/data/project-data.json")
    .then((response) => response.json())
    .then((data) => {
      const projectInfo = {};

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

      // Check if a project is in the URL and load it
      const projectKey = getProjectFromURL();
      if (projectKey && projectInfo[projectKey]) {
        if (projectsList) projectsList.style.display = "none";
        if (projectDetails) projectDetails.style.display = "block";
        if (projectContent) projectContent.innerHTML = projectInfo[projectKey];
        window.scrollTo(0, 0);
      }

      // Add event listeners for in-page project clicks
      document
        .querySelectorAll(".parallax[data-project]")
        .forEach((project) => {
          project.addEventListener("click", function () {
            const projectKey = this.getAttribute("data-project");

            if (projectsList) projectsList.style.display = "none";
            if (projectDetails) projectDetails.style.display = "block";
            if (projectContent) {
              projectContent.innerHTML =
                projectInfo[projectKey] || "<p>Project not found.</p>";
            }

            window.scrollTo(0, 0);
            history.pushState(
              { projectKey: projectKey },
              "",
              `?project=${projectKey}`
            );
          });
        });

      // Event Delegation for Lightbox Clicks
      if (projectContent) {
        projectContent.addEventListener("click", function (event) {
          const target = event.target.closest(".project-info-pictures");
          if (target) {
            const imageSrc = target.getAttribute("data-image");
            openLightbox(imageSrc);
          }
        });
      }

      // Handle back button functionality
      window.addEventListener("popstate", function () {
        if (projectsList) projectsList.style.display = "block";
        if (projectDetails) projectDetails.style.display = "none";
        if (projectContent) projectContent.innerHTML = "";
      });
    })
    .catch((error) => console.error("Error fetching project data:", error));
});
