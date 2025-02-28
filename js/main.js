document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is ready");

  const navbar = document.querySelector("nav");

  // Makes the navmenu change transparency as you scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 270) {
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
    const targetId = event.target.getAttribute("href").substring(1);
    const target = document.querySelector(`#${targetId}`);

    if (target) {
      event.preventDefault();
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
      window.addEventListener("load", () => {
        window.scrollTo({
          top:
            target.offsetTop - window.innerHeight / 2 + target.offsetHeight / 2,
          behavior: "smooth",
        });
      });
    }
  }

  // Install toast (for PWA installation) - Only show on mobile
  let deferredPrompt;

  function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (isMobile()) {
      showInstallToast();
    }
  });

  function showInstallToast() {
    const toast = document.getElementById("install-toast");
    toast.style.display = "block";

    setTimeout(() => {
      toast.style.opacity = "1";
    }, 100);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.style.display = "none";
      }, 500);
    }, 5000);
  }

  document.getElementById("install-toast-btn").addEventListener("click", () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log("PWA Install:", choiceResult.outcome);
        deferredPrompt = null;
        document.getElementById("install-toast").style.display = "none";
      });
    }
  });

  // Lightbox functionality for images
  const lightboxes = document.querySelectorAll(".lightbox");
  lightboxes.forEach((lightbox) => {
    const img = lightbox.querySelector("img");
    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("show");
    });
  });

  // Open the lightbox when clicking on images
  const imgLinks = document.querySelectorAll(".about-pictures a");
  imgLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const lightboxId = link.getAttribute("href");
      const lightbox = document.querySelector(lightboxId);
      lightbox.classList.add("show");
    });
  });
});
