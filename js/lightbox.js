// Function to open the lightbox with the selected image
function openLightbox(imageSrc) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    lightboxImg.src = imageSrc;
    lightbox.classList.add("show"); // Show the lightbox
  }
}

// Function to close the lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("show");
  }
}

// Close lightbox when pressing "Escape"
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

// Dynamically add a single lightbox element to the page
document.body.insertAdjacentHTML(
  "beforeend",
  `
      <div id="lightbox" class="lightbox" onclick="closeLightbox()">
        <div class="overlay"></div>
        <img id="lightbox-img" src="" alt="Lightbox Image">
      </div>
    `
);
