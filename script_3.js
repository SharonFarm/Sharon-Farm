// Mobile Menu Toggle (keep existing code)
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.add("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
});

// Close menu when clicking on a nav link (keep existing code)
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");
    });
});

// NEW: Fetch projects from single JSON file
document.addEventListener('DOMContentLoaded', function() {
    // First load the projects index
    //clear
    const container = document.querySelector('.projects-section');
    container.innerHTML = '';

    fetch('/data/projects.json')
        .then(res => res.json())
        .then(projects => {
            console.log('Loaded projects:', projects);
            const container = document.querySelector('.projects-section');
            
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <div class="project-carousel-wrapper">
                        <div class="swiper project-swiper">
                            <div class="swiper-wrapper">
                                ${project.gallery.map(img => `
                                    <div class="swiper-slide">
                                        <img src="${img.image}" alt="${project.title}" class="project-image">
                                    </div>
                                `).join('')}
                            </div>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                    <div class="project-details">
                        <h3 class="project-name">${project.title}</h3>
                        <p class="project-caption">${project.description}</p>
                        <p class="project-partner">Partnership: ${project.partner}</p>
                    </div>
                `;
                
                container.appendChild(projectCard);
                
                // Initialize Swiper
                new Swiper(projectCard.querySelector('.swiper'), {
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});