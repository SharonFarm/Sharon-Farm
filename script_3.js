// Mobile Menu Toggle (keep existing)
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.add("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
});

// Close menu on nav link click (keep existing)
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");
    });
});

// Project Loading - NEW IMPROVED VERSION
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.projects-section');
    
    // First clear ONLY project cards (preserve section title)
    const existingCards = container.querySelectorAll('.project-card');
    existingCards.forEach(card => card.remove());
    
    // Then load fresh data
    fetch('/data/projects.json')
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(projects => {
            if (!Array.isArray(projects)) {
                throw new Error('Invalid projects data format');
            }
            
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
        .catch(error => {
            console.error('Error loading projects:', error);
            // Optional: Display error message to user
            container.innerHTML += `<p class="error">Failed to load projects. Please refresh the page.</p>`;
        });
});