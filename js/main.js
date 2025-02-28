document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is ready");

  const navbar = document.querySelector("nav");

  // Makes the navmenu change transparency as you scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 270) {
      // Change this value to adjust when transparency changes
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Makes the about button scroll the about section to the middle of the screen.
  const scrollToAbout = (event) => {
    event.preventDefault();
    const target = document.querySelector("#about");
    const offset = window.innerHeight / 2 - target.offsetHeight / 2;
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: "smooth",
    });
  };

  // Function to handle smooth scroll on external/internal links
  const handleSmoothScroll = (event) => {
    const targetId = event.target.getAttribute("href").substring(1); // Extract the target ID from href
    const target = document.querySelector(`#${targetId}`);

    if (target) {
      event.preventDefault(); // Prevent default jump behavior
      const offset = window.innerHeight / 2 - target.offsetHeight / 2;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  // Attach the scroll-to-about functionality for internal and external links
  document.querySelectorAll('a[href="#about"]').forEach((anchor) => {
    anchor.addEventListener("click", scrollToAbout);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", handleSmoothScroll);
  });

  // Add functionality for external links that include #about in their path
  if (window.location.hash === "#about") {
    const target = document.querySelector("#about");
    if (target) {
      // Ensure it runs after page load
      window.addEventListener("load", () => {
        window.scrollTo({
          top:
            target.offsetTop - window.innerHeight / 2 + target.offsetHeight / 2,
          behavior: "smooth",
        });
      });
    }
  }
  // install toast
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // Prevent the default browser install prompt
    deferredPrompt = e; // Save the event for later use
    showInstallToast(); // Show the custom toast
  });

  function showInstallToast() {
    const toast = document.getElementById("install-toast");
    toast.style.display = "block";

    // Fade in the toast
    setTimeout(() => {
      toast.style.opacity = "1";
    }, 100);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.style.display = "none";
      }, 500);
    }, 5000);
  }

  document.getElementById("install-toast-btn").addEventListener("click", () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA Installed");
        }
        deferredPrompt = null;
        document.getElementById("install-toast").style.display = "none"; // Hide the toast after installation
      });
    }
  });
});
