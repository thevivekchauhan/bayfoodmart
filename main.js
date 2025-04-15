(function ($) {
    ("use strict");

    //canvas menu activation

    $(".canvas_open").on("click", function () {
        $(".offcanvas_menu_wrapper, .off_canvas_overlay").addClass("active");
    });

    $(".canvas_close").on("click", function () {
        $(".offcanvas_menu_wrapper, .off_canvas_overlay").removeClass("active");
    });

    // offcanvas menu
    var $offcanvasNav = $(".offcanvas_main_menu"),
        $offcanvasNavSubMenu = $offcanvasNav.find(".sub-menu");
    $offcanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fa fa-angle-down"></i></span>');

    $offcanvasNavSubMenu.slideUp();

    $offcanvasNav.on("click", "li a, li .menu-expand", function (e) {
        var $this = $(this);
        if ($this.parent().attr("class").match(/\b(menu-item-has-children| has-children | has-sub-menu)\b/) && ($this.attr("href") === "#" || $this.hasClass("menu-expand"))) {
            e.preventDefault();
            if ($this.siblings("ul:visible").length) {
                $this.siblings("ul").slideUp("slow");
            }
            else {
                $this.closest("li").siblings("li").find("ul:visible").slideUp("slow");
                $this.siblings("ul").slideDown("slow");
            }
        }

        if ($this.is("a") || $this.is("span") || $this.attr("class").match(/\b(menu-expand)\b/)) {
            $this.parent().toggleClass("menu-open");
        }
        else if ($this.is("li") && $this.attr("class").match(/\b('menu-item-has-children')\b/)) {
            $this.toggleClass("menu-open");
        }

    });

    //search box toggle
    $(".search_box > a").on("click", function () {
        $(this).toggleClass("active");
        $(".search_widget").slideToggle("medium");
    });

    //mini cart activation
    $(".mini_cart_wrapper > a").on("click", function () {
        if ($(window).width() < 991) {
            $(".mini_cart").slideToggle("medium");
        }
    });

    // header sticky
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();
        if (scroll < 100) {
            $(".sticky-header").removeClass("sticky");
        } else {
            $(".sticky-header").addClass("sticky");
        }
    });

    //master slider carousel

    var slider = new MasterSlider();
    slider.setup('masterslider', {
        width: 1024,
        height: 650,
        fullwidth: true,
        centerControls: false,
        speed: 18,
        view: 'flow',
        overPause: false,
        autoplay: true
    });

    slider.control('bullets', {
        autohide: false
    });

    // product 
    $(".product-slider").owlCarousel({
        loop: true,
        margin: 15,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 4,
                nav: true,
                dots: false
            }
        }
    });

})(jQuery);

// Smooth scrolling function
function smoothScroll(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        // Close mobile menu if open
        const offcanvasMenu = document.querySelector('.offcanvas_menu_wrapper');
        const overlay = document.querySelector('.off_canvas_overlay');
        if (offcanvasMenu && offcanvasMenu.classList.contains('active')) {
            offcanvasMenu.classList.remove('active');
            overlay.classList.remove('active');
        }

        // Scroll to section
        setTimeout(() => {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }, 300); // Small delay to allow menu to close
    }
}

// Add click handlers for navigation links
// document.addEventListener('DOMContentLoaded', function() {
//     // Handle main menu and mobile menu links
//     const allNavLinks = document.querySelectorAll('.main_menu a, .offcanvas_main_menu a');
    
//     allNavLinks.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
//             const href = this.getAttribute('href');
            
//             // Map navigation links to section IDs
//             const sectionMap = {
//                 'home': '#home',
//             };
            
//             if (sectionMap[href]) {
//                 smoothScroll(sectionMap[href]);
//             }
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let slideInterval;
    const intervalTime = 5000;
    
    // Initialize slider
    function goToSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots();
    }
    
    // Update dot indicators
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next slide
    function nextSlide() {
        const newIndex = (currentIndex + 1) % slideCount;
        goToSlide(newIndex);
    }
    
    // Previous slide
    function prevSlide() {
        const newIndex = (currentIndex - 1 + slideCount) % slideCount;
        goToSlide(newIndex);
    }
    
    // Start auto sliding
    function startSlider() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Stop auto sliding
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlider();
        startSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlider();
        startSlider();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopSlider();
            startSlider();
        });
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopSlider();
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startSlider();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
    
    // Pause on hover
    slider.addEventListener('mouseenter', stopSlider);
    slider.addEventListener('mouseleave', startSlider);
    
    // Initialize
    startSlider();
});