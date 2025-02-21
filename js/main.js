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

    // Makes the about button scroll the about to the middle of the screen.
    const scrollToAbout = (event) => {
        event.preventDefault();
        const target = document.querySelector('#about');
        const offset = window.innerHeight / 2 - target.offsetHeight / 2;
        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
        });
    };

    document.querySelector('nav a[href="#about"]').addEventListener('click', scrollToAbout);
    document.querySelector('a[href="#about"]').addEventListener('click', scrollToAbout);
    document.querySelector('a[href="../index.html#about"]').addEventListener('click', scrollToAbout);

});

