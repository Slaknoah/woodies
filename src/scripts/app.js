import $ from 'jquery';
// import testimonials from './components/testimonials'

var lastScrollTop = 0;
window.onscroll = function() { stickyNav(); }

var navbar = document.getElementById('navbar');

function stickyNav() {
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop; 
    if (currentScroll >= 84 && lastScrollTop > currentScroll) {
        navbar.classList.remove('pullup');
        navbar.classList.add('sticky');
        navbar.classList.add('dropdown');
    } 
    if (currentScroll >= 84 && lastScrollTop < currentScroll) {
        navbar.classList.remove('dropdown');
        if (navbar.classList.contains('sticky')) navbar.classList.add('pullup');
    }
    if (currentScroll <= 0 && lastScrollTop > currentScroll) {
        navbar.classList.remove('sticky');
        navbar.classList.remove('pullup');
        navbar.classList.remove('dropdown');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

$(document).ready(() => {
    /**
     * Inject SVG into page
     */
    $.get("assets/svg/sprite.svg", function(data) {
        const div = document.getElementById('svg-sprite');
        div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
    });


    /**
     * Menu scroll
     */
    var lastId,
    topMenu = $("#navbar"),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

    menuItems.click(function(e){
        var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
        $('html, body').stop().animate({ 
        scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop()+topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
        return this;
        });

        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("is-active")
                .end().filter("[href='#"+id+"']").parent().addClass("is-active");
        }                   
    });

    /**
     * Mobile side nav
     */
    $('#js-nav-toggle').click(function() {
        $(this).toggleClass('is-active')
        $('#js-sidebar').toggleClass('is-active');
    });
});