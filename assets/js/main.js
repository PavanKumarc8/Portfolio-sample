/*===== MENU SHOW =====*/ 
// Function to toggle menu
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

// Close menu when a link is clicked
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SHOW/HIDE SECTIONS WITH SMOOTH SCROLL =====*/
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        
        // Remove 'active' class from all links
        document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
        // Add 'active' class to the clicked link
        this.classList.add('active');

        // Hide all sections
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));

        // Show the clicked section
        const sectionId = this.getAttribute('href').substring(1); // Get the section id
        document.getElementById(sectionId).classList.add('active');

        // Smooth scroll to the section
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });

        // Close the menu after clicking a link
        document.getElementById('nav-menu').classList.remove('show');
    });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,  // Adjusted based on header height
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }                                                    
    });
};
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    // reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 }); 
sr.reveal('.home__social-icon', { interval: 200 }); 
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 }); 

/*===== SKILLS ANIMATION =====*/
const skillsData = document.querySelectorAll('.skills__data');

skillsData.forEach(skill => {
    skill.addEventListener('mouseover', function () {
        let percentageElement = this.querySelector('.skills__percentage');
        let barElement = this.querySelector('.skills__bar');
        let percentage = parseInt(percentageElement.textContent, 10);
        let current = 0;
        
        // Reset bar width and percentage on mouseover
        barElement.style.width = '0%';
        percentageElement.textContent = '0%';
        
        // Animate bar and percentage
        const updateBar = setInterval(() => {
            if (current >= percentage) {
                clearInterval(updateBar);
                percentageElement.textContent = `${percentage}%`; // Ensure percentage text shows final value
            } else {
                current++;
                barElement.style.width = `${current}%`;
                percentageElement.textContent = `${current}%`;
            }
        }, 20); // Adjust timing as needed
    });
});

/*===== CONTACT FORM SUBMISSION =====*/
document.querySelector('.contact__form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(this);

    // Submit data to Google Form
    fetch(this.action, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            this.reset();
        } else {
            alert('There was a problem sending your message.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('There was a problem sending your message.');
    });
});
