document.addEventListener('DOMContentLoaded', () => {
    console.log('Document is ready');


    const navbar = document.querySelector('nav');

    // Makes the navmenu change transparency as you scroll

    window.addEventListener('scroll', () => {
        if (window.scrollY > 270) { //change num to change when the navmenu transparency changes
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    document.querySelector('nav a[href="#about"]').addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });

});

