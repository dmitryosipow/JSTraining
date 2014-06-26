var rememberTop = 0;

window.onscroll = (function(e) {
    parallaxScroll();
});

function parallaxScroll() {
    var scrollTop = (window.pageYOffset !== undefined) ?
        window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var el = document.querySelector(".navigationMenu");
    var top = el.offsetTop;
    if(top && top < scrollTop ){
        rememberTop = top;
        el.classList.add('fixedMenu');
    }
    if(rememberTop && scrollTop < rememberTop){
        el.classList.remove('fixedMenu');
    }
}
