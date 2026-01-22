function openModal() {
    document.getElementById('resumeModal').style.display = 'block';
}

function openWorksModal() {
    document.getElementById('worksModal').style.display = 'block';
}

function closeWorksModal() {
    document.getElementById('worksModal').style.display = 'none';
}

// Image Lightbox Functions
function openLightbox(img) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
    caption.innerHTML = img.alt;
}

function closeLightbox() {
    document.getElementById('imageLightbox').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // Resume modal close button
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = function() {
            document.getElementById('resumeModal').style.display = 'none';
        }
    }
    
    // Works modal close button
    const closeWorksBtn = document.querySelector('.close-works');
    if (closeWorksBtn) {
        closeWorksBtn.onclick = closeWorksModal;
    }
    
    // Lightbox close button
    const lightboxClose = document.querySelector('.lightbox-close');
    if (lightboxClose) {
        lightboxClose.onclick = closeLightbox;
    }
    
    // Close when clicking outside
    window.onclick = function(event) {
        const resumeModal = document.getElementById('resumeModal');
        const worksModal = document.getElementById('worksModal');
        const lightbox = document.getElementById('imageLightbox');
        
        if (event.target == resumeModal) {
            resumeModal.style.display = 'none';
        }
        if (event.target == worksModal) {
            worksModal.style.display = 'none';
        }
        if (event.target == lightbox) {
            lightbox.style.display = 'none';
        }
    }    
    
    // Add click event to all modal work item images
    const workImages = document.querySelectorAll('.modal-work-item img');
    workImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.onclick = function() {
            openLightbox(this);
        }
    });

    // Active nav on scroll - FIXED VERSION
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function setActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);
    setActiveNav(); 
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tab filtering for works modal
    const tabBtns = document.querySelectorAll('.tab-btn');
    const workCategories = document.querySelectorAll('.works-category');
    const categoryDividers = document.querySelectorAll('.category-divider');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide categories and dividers
            workCategories.forEach(cat => {
                if (cat.getAttribute('data-category') === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
            
            categoryDividers.forEach(divider => {
                if (divider.getAttribute('data-category') === category) {
                    divider.style.display = 'block';
                } else {
                    divider.style.display = 'none';
                }
            });
        });
    });
    
    // Animate skill bars when scrolling into view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach(fill => {
                    fill.classList.add('animate');
                });
            }
        });
    }, observerOptions);
    
    // Observe the graphic tools card
    const graphicCard = document.querySelector('.graphic-tools');
    if (graphicCard) {
        observer.observe(graphicCard);
    }
});