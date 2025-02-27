document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll(".parallax[data-project]");
  const projectsList = document.getElementById("projects-list");
  const projectDetails = document.getElementById("project-details");
  const projectContent = document.getElementById("project-content");

  // Dynamically add the lightbox HTML to the page
  const lightboxHTML = `
    <div id="lightbox" class="lightbox" onclick="closeLightbox()">
      <div class="overlay"></div>
      <img id="lightbox-img" src="" alt="Lightbox Image">
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  fetch("../assets/data/project-data.json")
    .then((response) => response.json())
    .then((data) => {
      const projectInfo = {};

      // Generate HTML for each project
      data.forEach((project) => {
        let imagesHTML = project.images
          .map(
            (image, imgIndex) => `
              <div class="project-info-pictures" onclick="openLightbox('${image}')">
                <img src="${image}" alt="${project.title} - Image ${imgIndex + 1}" />
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

      // Handle back button functionality
      window.addEventListener("popstate", function () {
        projectsList.style.display = "block";
        projectDetails.style.display = "none";
        projectContent.innerHTML = "";
      });
    })
    .catch((error) => console.error("Error fetching project data:", error));

  // Lightbox functionality
  window.openLightbox = function (imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (lightbox && lightboxImg) {
      lightboxImg.src = imageSrc;
      lightbox.style.display = "flex";
    }
  };

  window.closeLightbox = function () {
    document.getElementById("lightbox").style.display = "none";
  };

  // Close lightbox when pressing "Escape"
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
});
